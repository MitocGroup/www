# Featured
1

# Author
eistrati

# AboutAuthor
Proud Father. Lucky Husband. Open Source Contributor. DevOps | Automation | Serverless @MitocGroup. Former @AWScloud and @HearstCorp.

# PublicationDate
Sat, 28 May 2019 12:12:55 -0400

# Thumbnail
/images/blog/2018-08-27/terrahub-io-serverless-architecture-in-action.png

# Title
Introducing Programmatic AWS Landing Zone as Terraform Module

# Intro
AWS Landing Zone is a solution that helps customers more quickly set up a secure, multi-account AWS environment based on AWS best practices.

---

In over 5 years of our corporate existence our team at Mitoc Group was relentlessly working to help large organizations transform themselves and build or migrate their IT footprint to AWS cloud. In other words — quoting our friends from AWS — our customers are reinventing themselves on AWS. It is a never ending effort to invent and simplify on behalf of customers, and AWS is doing a great job at solving complex problems with easy to digest solutions.

<div class="floatleft">
    <img src="/images/blog/2019-06-17/aws-landing-zone.png" alt="AWS Landing Zone Architecture" />
    <div class="center img-description">
        AWS Landing Zone (source: <a href="https://aws.amazon.com/solutions/aws-landing-zone" rel="noreferrer">https://aws.amazon.com/solutions/aws-landing-zone</a>)
    </div>
</div>

### What is AWS Landing Zone? Quoting from official source:

_AWS Landing Zone is a solution that helps customers more quickly set up a secure, multi-account AWS environment based on AWS best practices. With the large number of design choices, setting up a multi-account environment can take a significant amount of time, involve the configuration of multiple accounts and services, and **require a deep understanding of AWS services.**_

The AWS Landing Zone solution reduced by a lot the complexity and the consistency of similar design patterns provided to different customers. On the other hand, our team had to rebuild some CloudFormation components as Terraform components, in order to use them further down the automation pipeline.

So we asked ourselves: Why not to build the entire AWS Landing Zone solution in Terraform? Would that be feasible and would that solve our customers problems? Spoiler alert: It is and it does :)

### When NOT to Use AWS Landing Zone?

If you are managing your cloud services and cloud resources within one or two AWS accounts, this solution might be an overkill for you. Everybody else, please continue reading :)

### What to Consider Before Getting Started?

Many large organizations we have worked with do have some kind of cloud strategy already in place. Without a clear vision and clear expectations, companies struggle to adopt cloud services successfully. Please consider spending some time in order to define your own cloud strategy and how does AWS fit into that strategy.

Once the strategy is in place, successful AWS Landing Zone customers have considered proactively the following prerequisites:

1. Automation is NOT an option. Cloud native automation is preferred.
2. Teams are consistently using the same pipelines with the same toolset for cloud resources provisioning. Terraform is preferred.
3.Cloud champions are empowered to build reusable processes and expose them as reusable services instead of reusable code. Serverless architecture is preferred.

### Introducing Terraform Module for AWS Landing Zone

After a couple of months of hard work, it is my pleasure to introduce terraform module for AWS Landing Zone (see above link). [Source code](https://github.com/TerraHubCorp/terraform-aws-landing-zone) is managed using GitHub and [stable releases](https://registry.terraform.io/modules/TerraHubCorp/landing-zone) are published on Terraform Module Registry.

To get started, simply include main.tf into your terraform codebase:

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

NOTE: Make sure to include _variables.tf_ and whatever makes sense from outputs.tf

To simplify and make it easier to understand, we included default values in _terraform.tfvars_:

```

account_id = "123456789012"
region = "us-east-1"
landing_zone_components = {
  landing_zone_pipeline_s3_bucket = "s3://terraform-aws-landing-zone/mycompany/landing_zone_pipeline_s3_bucket/default.tfvars"
  [...]
}
        
```

This means that when you use this terraform module, you will need to:

1. Change _account\_id_ and _region_ to values that correspond to your AWS Organization
2. Change _landing_zone_components_ to values that fit into your AWS Landing Zone use case
3. Change _s3://terraform-aws-landing-zone/mycompany_ to your S3 bucket and S3 key prefix where you will be storing .tfvars files (or absolute path to .tfvars files on local disk)
This module can have tens, hundreds or thousands of deployable components, but not all of them should be and will be deployed. At runtime, components that are not part of _landing\_zone\_components_ map variable will be ignored.

### Conclusion

We are very excited and proud of sharing some fruits of our continuous effort to help customers build cloud native automation. Terraform module for AWS Landing Zone is just another solution that helps organizations more quickly set up a secure, multi-account AWS environment based on AWS best practices. We are well aware that AWS evolves with an insanely fast pace, and we are committed to evolve this terraform powered solution that covers all the basics, as well as integrates with other successful solutions on AWS.

### Final thoughts

TerraHub.io is the DevOps Hub for Terraform Automation. We provide managed services that simplify cloud resources management using terraform. If this is of your interest and you'd like to learn more, please feel free to reach out over [Email](mailto:hello@terrahub.io), [Twitter](https://twitter.com/terrahubcorp) or [LinkedIn](https://www.linkedin.com/company/terrahubcorp). We'd be happy to help!
