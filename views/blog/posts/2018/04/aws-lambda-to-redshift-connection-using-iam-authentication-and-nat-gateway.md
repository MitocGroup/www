# Featured
0

# Author
Eugene Istrati

# AboutAuthor
Proud Father. Lucky Husband. Open Source Contributor. DevOps | Automation | Serverless @MitocGroup. Former @AWScloud and @HearstCorp.

# Avatar
eistrati.png

# TwitterUsername
eistrati

# PublicationDate
Mon, 23 April 2018 12:20:55 -0400

# Thumbnail
/images/blog/2018-04-23/example.png

# Title
AWS Lambda to Redshift Connection using IAM authentication and NAT gateway

# Intro
Python Edition. This article walks through the steps taken and lessons learned, in order to connect AWS Lambda to Amazon Redshift running in Amazon VPC. Described solution involves minimal maintenance effort while providing top notch security and reliability.

---

<div class="padd25px">
    <img src="/images/blog/2018-04-23/example.png" alt="partner aws" />
</div>

Although the use case I worked on is not exactly the one from the picture above, I wanted to share my story because I don’t want others waste their time with it. Recently I was required to implement a solution that involves connecting AWS Lambda to Amazon Redshift. If Amazon VPC is not in scope, feel free to stop reading here and ignore the rest of this article.

### Challenges

During implementation, I had to overcome the following challenges:

1. AWS Lambda’s python runtime doesn’t support natively libpq.so which is required by psycopg2 library to connect to Amazon Redshift;
2. Securely storing and rotating Amazon Redshift’s credentials was becoming another full time project;
3. IAM authentication for Amazon Redshift is amazing, but it took me a while to get it functional in Amazon VPC.

### Implementation

For the sake of simplicity, I’ve reduced the python code used in AWS Lambda function to the minimum, as shown below:

```py
import os
import psycopg2
import sys

def lambda_handler(event, context):
  REDSHIFT_DATABASE = os.environ['REDSHIFT_DATABASE']
  REDSHIFT_USER = os.environ['REDSHIFT_USER']
  REDSHIFT_PASSWD = os.environ['REDSHIFT_PASSWD']
  REDSHIFT_PORT = os.environ['REDSHIFT_PORT']
  REDSHIFT_ENDPOINT = os.environ['REDSHIFT_ENDPOINT']
  REDSHIFT_QUERY = "SELECT DISTINCT tablename FROM pg_table_def WHERE schemaname = 'public' ORDER BY tablename"

  try:
    conn = psycopg2.connect(
      dbname=REDSHIFT_DATABASE,
      user=REDSHIFT_USER,
      password=REDSHIFT_PASSWD,
      port=REDSHIFT_PORT,
      host=REDSHIFT_ENDPOINT)
  except Exception as ERROR:
    print("Connection Issue: " + ERROR)
    sys.exit(1)

  try:
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    print(cursor.execute(REDSHIFT_QUERY))
    cursor.close()
    conn.commit()
    conn.close()
  except Exception as ERROR:
    print("Execution Issue: " + ERROR)
    sys.exit(1)
```

#### Issue #1

If you develop on Mac OSX or Windows, the local version of psycopg2 library most probably is not compatible with AWS Lambda python3.6 runtime. I got the following error:

```
No module named 'psycopg2._psycopg': ModuleNotFoundError
```

This is an easy and quick fix. Either you’re compiling psycopg2 library on an Amazon Linux compatible operating system. Or, a much better alternative, use the following GitHub repository:

<div class="external-article">
  <a href="https://github.com/jkehler/awslambda-psycopg2?source=post_page-----b40c6002082b----------------------">
  <h5>jkehler/awslambda-psycopg2</h5>
  <span>Contribute to awslambda-psycopg2 development by creating an account on GitHub.</span>
    <span>github.com</span>
  </a>
</div>

#### Issue #2

AWS Lambda provides environment variables capability, which allows developers to decouple fixed components of the code from variable ones. Since our team manages most of our cloud resources using Terraform, here below is the simplified version Terraform script for Lambda function:

```
resource "aws_lambda_function" "lambda_function" {
  s3_bucket        = "${var.lambda_source_bucket}"
  s3_key           = "${var.lambda_source_file}"

  source_code_hash = "${base64sha256(file(var.lambda_source_file))}"
  function_name    = "${var.lambda_function_name}"
  handler          = "${var.lambda_function_handler}"
  runtime          = "${var.lambda_function_runtime}"
  timeout          = "${var.lambda_function_timeout}"
  role             = "${var.lambda_iam_role}"

  vpc_config {
    security_group_ids = ["${split(",", var.lambda_security_group_ids)}"]
    subnet_ids         = ["${split(",", var.lambda_vpc_subnet_ids)}"]
  }

  environment {
    variables = {
      REDSHIFT_ENDPOINT = "${var.redshift_connection["endpoint"]}"
      REDSHIFT_PORT     = "${var.redshift_connection["port"]}"
      REDSHIFT_USER     = "${var.redshift_connection["username"]}"
      REDSHIFT_PASSWD   = "${var.redshift_connection["password"]}"
      REDSHIFT_DATABASE = "${var.redshift_connection["database"]}"
    }
  }
}
```

Now, everything related to Amazon Redshift connection is concentrated in _redshift\_connection_ variable, which stores values in plain text. To overcome this security problem, we have to consider one of the following solutions:

1. [AWS Key Management Service](https://aws.amazon.com/kms/)
2. [AWS Systems Manager’s Parameter Store](https://aws.amazon.com/systems-manager/features/)
3. [IAM Authentication for Amazon Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/redshift-iam-authentication-access-control.html)

Using KMS or Parameter Store is definitely a viable solution, but I opted to the most natural choice and less maintenance effort down the road: the native integration between Redshift and IAM. Shortly, with an API call, Redshift issues temporary credentials based on IAM permissions which can be used for Redshift connections. Now my Lambda function looks like this:

```py
import os
import boto3
import psycopg2
import sys

def lambda_handler(event, context):
  REDSHIFT_DATABASE = os.environ['REDSHIFT_DATABASE']
  REDSHIFT_USER = os.environ['REDSHIFT_USER']
  REDSHIFT_PASSWD = os.environ['REDSHIFT_PASSWD']
  REDSHIFT_PORT = os.environ['REDSHIFT_PORT']
  REDSHIFT_ENDPOINT = os.environ['REDSHIFT_ENDPOINT']
  REDSHIFT_CLUSTER = os.environ['REDSHIFT_CLUSTER']
  REDSHIFT_QUERY = "SELECT DISTINCT tablename FROM pg_table_def WHERE schemaname = 'public' ORDER BY tablename"

  try:
    client = boto3.client('redshift')
    creds = client.get_cluster_credentials(
      DbUser=REDSHIFT_USER,
      DbName=REDSHIFT_DATABASE,
      ClusterIdentifier=REDSHIFT_CLUSTER,
      DurationSeconds=3600)
  except Exception as ERROR:
    print("Credentials Issue: " + ERROR)
    sys.exit(1)

  try:
    conn = psycopg2.connect(
      dbname=REDSHIFT_DATABASE,
      user=creds['DbUser'],
      password=creds['DbPassword'],
      port=REDSHIFT_PORT,
      host=REDSHIFT_ENDPOINT)
  except Exception as ERROR:
    print("Connection Issue: " + ERROR)
    sys.exit(1)

  try:
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    print(cursor.execute(REDSHIFT_QUERY))
    cursor.close()
    conn.commit()
    conn.close()
  except Exception as ERROR:
    print("Execution Issue: " + ERROR)
    sys.exit(1)
```

#### Issue #3

The most time consuming, as well as the most interesting challenge to address was Lambda function timeout. Turns out that switching to Redshift temporary credentials, you need AWS Lambda to be able to access Redshift APIs that are not available by default in your VPC. The options are to route either through ENI or through NAT. I opted for NAT gateway solution that is summarized here below using the following Terraform script:

```
data "aws_security_group" "security_group" {
  id = "${join("",slice(var.lambda_security_group_ids,0,1))}"
}

data "aws_subnet_ids" "lambda_subnets" {
  vpc_id = "${data.aws_security_group.security_group.vpc_id}"
}

resource "aws_eip" "nat" {
  vpc = true
}

resource "aws_nat_gateway" "lambda_gateway" {
  allocation_id = "${aws_eip.nat.id}"
  subnet_id     = "${join("",slice(data.aws_subnet_ids.lambda_subnets.ids,0,1))}"
}

resource "aws_route_table" "lambda_private" {
  vpc_id = "${data.aws_security_group.security_group.vpc_id}"

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = "${aws_nat_gateway.lambda_gateway.id}"
  }
}

resource "aws_route_table_association" "lambda_private" {
  subnet_id      = "${join("",slice(data.aws_subnet_ids.lambda_subnets.ids,1,2))}"
  route_table_id = "${aws_route_table.lambda_private.id}"
}
```

### Conclusion

I would argue that, at the time of blog post writing, this is the ideal solution to connect AWS Lambda with Amazon Redshift running in Amazon VPC. If you use python3.6 runtime, consider [awslambda-psycopg2](https://github.com/jkehler/awslambda-psycopg2) repository. Next, replace regular postgres driver connection with [IAM authentication](https://docs.aws.amazon.com/redshift/latest/mgmt/redshift-iam-authentication-access-control.html). Finally, enable [outside VPC access](https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function/).

Share your thoughts and your experience on [LinkedIn](https://linkedin.com/company/mitoc-group), [Twitter](https://twitter.com/mitocgroup), [Facebook](https://facebook.com/mitocgroup) or in the comments section below.
