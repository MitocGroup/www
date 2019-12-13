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
Thu, 20 October 2016 12:20:55 -0400

# Thumbnail
/images/blog/2016-10-20/lambda-edge.png

# Title
Blue-Green Deployments for Serverless Powered Applications on AWS

# Intro
First described by Martin Fowler back in 2010, blue-green deployment is 
a release technique that reduces downtime and risk by running two identical 
production environments called Blue and Green.

---

<div class="img-post-left">
    <img src="/images/blog/2016-11-29/partner-network.jpeg" alt="lambda edge" />
    <div class="center img-description">Source:
        <a href="https://devopscube.com/wp-content/uploads/2016/12/lamda@edge.png" rel="noreferrer">https://devopscube.com/wp-content/uploads/2016/12/lamda@edge.png</a>
    </div>
</div>

Fast-forwarding to 2013, [Danilo Sato](https://github.com/dtsato) from ThoughtWorks published on their blog a very insightful article that describes [how to implement blue-green deployments using AWS.](https://www.thoughtworks.com/insights/blog/implementing-blue-green-deployments-aws) We, at Mitoc Group, are working primarily with serverless computing from AWS, and today we’d like to share our experience using blue-green deployment process for serverless powered applications.

>_Note: This blogpost uses intentionally screenshots from AWS Management Console to outline a Do-It-Yourself point of view, but we’ll also provide (wherever possible) the equivalent devops command or tool, to make sure that more advanced audience is NOT bored to death :)_

The key points to keep in mind as we move forward:

1. We use **full stack** approach to build web applications using serverless computing from AWS (not just AWS Lambda and API Gateway)
2. We enforce **security in every layer** and **least privilege access** (e.g. front-end tier, back-end tier, data tier, as well as centralized monitoring)
3. We apply the same approach to newly built applications, as well as newly cloud-migrated applications that are compatible with **microservices architecture** (we call them **cloud-native applications**)

### Serverless Architecture on AWS

Before we dive into the details of the blue-green deployment process for serverless powered applications, it’s vital to point out the architecture of a typical web application that uses serverless computing from AWS (as shown in the picture below, as well as described in [this blogpost](https://www.mitocgroup.com/blog/building-enterprise-level-web-applications-on-aws-lambda-with-the-deep-framework)).

<div class="img-post-left">
    <img src="https://miro.medium.com/max/3968/1*obn8oKjcqkJJUIZ2bB59xg.png" alt="lambda-deep-framework" />
    <div class="center img-description">
        <a href="https://www.mitocgroup.com/blog/building-enterprise-level-web-applications-on-aws-lambda-with-the-deep-framework" rel="noreferrer">https://www.mitocgroup.com/blog/building-enterprise-level-web-applications-on-aws-lambda-with-the-deep-framework</a>
    </div>
</div>

Here below is the summarized list of AWS products we use:

 - Security tier: 1) [AWS IAM](https://aws.amazon.com/iam/) and 2) [Amazon Cognito](https://aws.amazon.com/cognito/)
 - Front-end tier: 3) [Amazon Route53](https://aws.amazon.com/route53/), 4) [Amazon CloudFront](https://aws.amazon.com/cloudfront/) and 5) [Amazon S3](https://aws.amazon.com/s3/)
 - Back-end tier: 6) [Amazon API Gateway](https://aws.amazon.com/api-gateway/), 7) [AWS Lambda](https://aws.amazon.com/lambda/) and 8) [Amazon SNS](https://aws.amazon.com/sns/)
 - Data tier: 9) [Amazon DynamoDB](https://aws.amazon.com/dynamodb/), 10) [Amazon SQS](https://aws.amazon.com/sqs/), 11) [Amazon ElastiCache](https://aws.amazon.com/elasticache/) and 12) [Amazon Elasticsearch Service](https://aws.amazon.com/elasticsearch-service/)
 - Monitoring tier: 13) [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/), 14) [AWS CloudTrail](https://aws.amazon.com/cloudtrail/) and 12) [Amazon Elasticsearch Service](https://aws.amazon.com/elasticsearch-service/)

_```Note: As you can see above, a typical web application in our case uses 14 different services from AWS. Also, Amazon CloudSearch is a much better fit as a serverless option for full-text search capabilities, but we prefer Elasticsearch technology and Amazon Elasticsearch Service instead```_

### Pre-requisites and Initial Considerations

The blue-green deployment for serverless powered applications is happening entirely on the front-end tier, mainly because all other resources from back-end, data, monitoring and security tiers are duplicated and therefore are NOT altered during this process. So, going forward, we’ll be describing only the changes that will be applied to Amazon Route53, Amazon CloudFront and Amazon S3 during any serverless blue-green deployment.

The simplest and most straight-forward approach to blue-green deployments for serverless powered applications is to switch all traffic from blue environment to green environment on DNS level (and in case of failures, rollback from green environment to blue environment).

Managing DNS records can be sometimes very tricky, mainly because the propagation might take unpredictable time due to various caching layers on Internet. But our experience with Amazon Route53 is amazing, as long as we are using A alias records instead of CNAME records. Here below are 3 screenshots from AWS Management Console that shows how we’ve setup _www1.adtechmedia.io_ in Amazon Route53, Amazon CloudFront and Amazon S3:

<div class="maxHeight500px center padd25px">
    <img src="/images/blog/2016-10-20/edit-record-set.png" alt="edit-record-set" />
    <div class="center img-description">
        aws route53 list-resource-record-sets --hosted-zone-id [YOUR_HOSTED_ZONE_ID]
    </div>
</div>

<div class="padd25px">
    <img src="/images/blog/2016-10-20/get-distribution.png" alt="get-distribution" />
    <div class="center img-description">
        aws cloudfront get-distribution --id [YOUR_DISTRIBUTION_ID]
    </div>
</div>

<div class="">
    <img src="/images/blog/2016-10-20/stati-webhosting.png" alt="static-webhosting" />
    <div class="center img-description">
        aws s3 website s3://www1.adtechmedia.io/ --index-document index.html --error-document error.html
    </div>
</div>

### Blue/Green Deployments v1

At this point, we are ready to switch from blue environment to green environment with zero downtime and low risks. The switch is quite simple:

**Step 1:** Update CloudFront distribution for blue environment by removing _www1.adtechmedia.io_ from Alternative Domain Names (CNAMEs)

<div class="">
    <img src="/images/blog/2016-10-20/step1.png" alt="step1" />
    <div class="center img-description">
        aws cloudfront update-distribution --distribution-config file://distconfig-disabled.json --id [YOUR_DISTRIBUTION_ID]
    </div>
</div>

**Step 2:** Update CloudFront distribution for green environment by adding _www1.adtechmedia.io_ to Alternative Domain Names (CNAMEs)

<div class="">
    <img src="/images/blog/2016-10-20/step2.png" alt="step2" />
    <div class="center img-description">
        aws cloudfront update-distribution --distribution-config file://distconfig-disabled.json --id [YOUR_DISTRIBUTION_ID]
    </div>
</div>



**Step 3:** Update Route53 A alias record with CloudFront distribution Domain Name from green environment

<div class="maxHeight500px center">
    <img src="/images/blog/2016-10-20/step3.png" alt="step3" />
    <div class="center img-description">
        aws route53 change-resource-record-sets --change-batch file://resource-record.json --hosted-zone-id [YOUR_HOSTED_ZONE_ID]
    </div>
</div>

If, for some unexpected reason, your green environment starts generating high level of failures, the rollback process is pretty similar to the one described above:

1. Remove CNAME from green environment
2. Add CNAME to blue environment
3. Update Amazon Route53 with blue environment Domain Name

>_UPDATE on 11/03/2016: A friend pointed out that it’s not necessarily to add/remove CNAMEs (which could take up to 20 minutes to propagate). Instead, just leave blue environment as it is (e.g. www1.adtechmedia.io) and setup wild carded CNAME on green environment (e.g. *.adtechmedia.io). When both distributions are enabled, blue will take precedence over green, making sure you’re not stuck with new deploy in case of high level of failures._

### Blue/Green Deployments v2

As you have seen in the previous blue-green deployments process the traffic between environments is switched suddenly, at 100% capacity. This is great for zero downtime, but if your application starts to fail, all of your users are affected. Some modern continuous deployment technics promote a more gradual switch of the traffic between environments. For example, we push only 5% of requests to green environment, while 95% still goes to blue environment. This allows to detect production problems early and on a much smaller audience of users, problems that have never surfaced in testing and staging phases. Is it possible to enable such an approach for serverless powered applications?

Short answer, yes! We’re very excited and humble to be able to explain our serverless solution, but there are some additional pre-requisites that must happen before. Let’s describe the challenge first, and then jump into our implementation and pre-requisites.

#### The Challenge

Amazon CloudFront, the way it is designed, doesn’t allow same CNAME on multiple distributions. That is also the reason why we’re removing it from the blue environment and adding it to the green environment in our previous implementation.

#### Our implementation

Amazon Route53 allows weighted routing of the traffic across multiple Amazon CloudFront distributions, Amazon S3 static websites and other endpoints. So, instead of load balancing requests between distributions, we are changing current A alias record that points to blue environment from simple routing to weighted routing, and add another A alias record as green environment that points directly to Amazon S3 static website endpoint. This enables us to manipulate requests across environments as we wish: 95% vs 5% (as shown in the screenshot below), then (if everything is fine) 90% vs 10%, and so on until blue is 0% and green is 100%.


<div class="maxHeight500px center">
    <img src="/images/blog/2016-10-20/hosted-zone-id.png" alt="hosted-zone-id" />
    <div class="center img-description">
        aws route53 change-resource-record-sets --change-batch file://resource-record.json --hosted-zone-id [YOUR_HOSTED_ZONE_ID]
    </div>
</div>

All changes are made on Amazon Route53 level, without altering Amazon CloudFront or Amazon S3 resources. And compared to previous blue-green deployment, rollback process is even faster and easier. We remove A alias record of green environment and we’re done! Well, almost done... For consistency and cost saving purposes, we also revert back A alias record of blue environment from weighted routing to simple routing.

### Final Thoughts and Conclusion

What are the down sizes (pre-requisites) of the blue-green deployments v2?

1. Amazon S3 static website hosting doesn’t support SSL, so we find ourselves temporarily enforcing HTTP-only during blue-green deployment
2. Amazon S3 static endpoint can be used with Amazon Route53 A alias only if the bucket name is the same with the domain name (e.g. [www.adtechmedia.io](http://www.adtechmedia.io))
3. Depends on the traffic size, specifically how much TPS you’re consuming, Amazon S3 might start throttling you (more details here: [Request Rate and Performance Considerations](https://docs.aws.amazon.com/AmazonS3/latest/dev/request-rate-perf-considerations.html))

Unfortunately, there is no silver bullet that would work perfectly for any serverless powered applications on AWS. As with any software, it’s up to us (developers or devops engineers) to decide the right process that fits specific use case. We just wanted to share two different approaches that empowered us to provide high quality at scale without compromising on resources and costs (which, by the way, are ridiculously low, but that’s another blogpost).

<div class="center img-description">
        <a href="https://www.mitocgroup.com/blog/mitoc-group-featured-as-frameworks-partner-by-aws-lambda-team">
        https://www.mitocgroup.com/blog/mitoc-group-featured-as-frameworks-partner-by-aws-lambda-team</a>
</div>

Last, but not the least, [Mitoc Group](https://www.mitocgroup.com/) is a technology company that focuses on innovative enterprise solutions. Share your thoughts and your experience on [LinkedIn](https://linkedin.com/company/mitoc-group), [Twitter](https://twitter.com/mitocgroup) or [Facebook](https://facebook.com/mitocgroup).
