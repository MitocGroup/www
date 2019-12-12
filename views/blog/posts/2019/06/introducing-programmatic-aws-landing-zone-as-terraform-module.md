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
Mon, 17 Jun 2019 12:20:55 -0400

# Thumbnail
/images/blog/2019-06-17/aws-arch.png

# Title
Introducing Programmatic AWS Landing Zone as Terraform Module

# Intro
AWS Landing Zone is a solution that helps customers more quickly set up a secure, multi-account AWS environment based on AWS best practices

---

In over 5 years of our corporate existence our team at Mitoc Group was relentlessly working to help large organizations transform themselves and build or migrate their IT footprint to AWS cloud. In other words — quoting our friends from AWS — our customers are reinventing themselves on AWS. It is a never ending effort to invent and simplify on behalf of customers, and AWS is doing a great job at solving complex problems with easy to digest solutions.

<div class="img-post-left">
    <img src="/images/blog/2019-06-17/aws-arch.png" alt="AWS Landing Zone" />
    <div class="center img-description">AWS Landing Zone (source:
       <a href="https://aws.amazon.com/solutions/aws-landing-zone" target="_blank">https://aws.amazon.com/solutions/aws-landing-zone</a>)
    </div>
</div>

### What is AWS Landing Zone?

Quoting from official source:

_AWS Landing Zone is a solution that helps customers more quickly set up a secure, multi-account AWS environment based on AWS best practices. With the large number of design choices, setting up a multi-account environment can take a significant amount of time, involve the configuration of multiple accounts and services, and **require a deep understanding of AWS services.**_

The AWS Landing Zone solution reduced by a lot the complexity and the consistency of similar design patterns provided to different customers. On the other hand, our team had to rebuild some CloudFormation components as Terraform components, in order to use them further down the automation pipeline.

So we asked ourselves: Why not to build the entire AWS Landing Zone solution in Terraform? Would that be feasible and would that solve our customers problems? Spoiler alert: It is and it does :)

### When NOT to Use AWS Landing Zone?

If you are managing your cloud services and cloud resources within one or two AWS accounts, this solution might be an overkill for you. Everybody else, please continue reading :)

### What to Consider Before Getting Started?

Many large organizations we have worked with do have some kind of cloud strategy already in place. Without a clear vision and clear expectations, companies struggle to adopt cloud services successfully. Please consider spending some time in order to define your own cloud strategy and how does AWS fit into that strategy.

Once the strategy is in place, successful AWS Landing Zone customers have considered proactively the following prerequisites:

- Automation is NOT an option. Cloud native automation is preferred.
- Teams are consistently using the same pipelines with the same toolset for cloud resources provisioning. Terraform is preferred.
- Cloud champions are empowered to build reusable processes and expose them as reusable services instead of reusable code. Serverless architecture is preferred.

### Introducing Terraform Module for AWS Landing Zone

<div class="external-article">
  <a href="https://registry.terraform.io/modules/TerraHubCorp/landing-zone/aws?source=post_page-----3e566ee6e73f----------------------">
  <h5>Terraform Module Registry: AWS Landing Zone</h5>
  <span>
    AWS Landing Zone is a solution that helps customers more quickly set up a secure, multi-account AWS environment based on AWS best practices. This repository contains one terraform module that dynamically deploys components of AWS Landing Zone solution based on input list of .tfvars files.
  </span>
    <span>registry.terraform.io</span>
  </a>
</div>

After a couple of months of hard work, it is my pleasure to introduce terraform module for AWS Landing Zone (see above link). [Source code](https://github.com/TerraHubCorp/terraform-aws-landing-zone) is managed using GitHub and [stable releases](https://registry.terraform.io/modules/TerraHubCorp/landing-zone) are published on Terraform Module Registry.

To get started, simply include `main.tf` into your terraform codebase:

```
module "landing_zone" {
  source     = "TerraHubCorp/landing-zone/aws"
  version    = "0.0.6"
  root_path  = "${path.module}"
  account_id = "${var.account_id}"
  region     = "${var.region}"
  landing_zone_components = "${var.landing_zone_components}"
}
```

>NOTE: Make sure to include `variables.tf` and whatever makes sense from `outputs.tf`

To simplify and make it easier to understand, we included default values in `terraform.tfvars`:

```
account_id = "123456789012"
region = "us-east-1"
landing_zone_components = {
  landing_zone_pipeline_s3_bucket = "s3://terraform-aws-landing-zone/mycompany/landing_zone_pipeline_s3_bucket/default.tfvars"
  [...]
}
```

This means that when you use this terraform module, you will need to:

1. Change `account_id` and `region` to values that correspond to your AWS Organization
2. Change `landing_zone_components` to values that fit into your AWS Landing Zone use case
3. Change `s3://terraform-aws-landing-zone/mycompany` to your S3 bucket and S3 key prefix where you will be storing `.tfvars` files (or absolute path to `.tfvars` files on local disk)

This module can have tens, hundreds or thousands of deployable components, but not all of them should be and will be deployed. At runtime, components that are not part of `landing_zone_components` map variable will be ignored.

### Conclusion

We are very excited and proud of sharing some fruits of our continuous effort to help customers build cloud native automation. Terraform module for AWS Landing Zone is just another solution that helps organizations more quickly set up a secure, multi-account AWS environment based on AWS best practices. We are well aware that AWS evolves with an insanely fast pace, and we are committed to evolve this terraform powered solution that covers all the basics, as well as integrates with other successful solutions on AWS.

Share your thoughts and your experience on [LinkedIn](https://linkedin.com/company/mitoc-group), [Twitter](https://twitter.com/mitocgroup), [Facebook](https://facebook.com/mitocgroup) or in the comments section below.
