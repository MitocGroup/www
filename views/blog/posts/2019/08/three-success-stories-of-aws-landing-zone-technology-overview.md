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
Thu, 1 August 2019 12:20:55 -0400

# Thumbnail
/images/blog/2019-08-01/aws-lz-arch.png

# Title
Three Success Stories of AWS Landing Zone (Technology Overview)

# Intro
After introducing Terraform Module for AWS Landing Zone and providing Business Overview of Our Experience with AWS Landing Zone, let’s dive deeper into the technical overview.

---

In this article, we will be covering the technical aspects of implementations and critical details that helped deploy and manage consistent multi-account strategy using AWS best practices. We will start with reference architecture (see picture below) for AWS Landing Zone solution and dive deeper into each customer’s customization that make their solutions both unique and reusable.

<div class="padd25px">
    <img src="/images/blog/2019-08-01/aws-lz-arch.png" alt="partner aws" />
    <div class="center img-description">
      AWS Landing Zone Architecture (source:
      <a href="https://aws.amazon.com/solutions/aws-landing-zone">https://aws.amazon.com/solutions/aws-landing-zone</a>)
    </div>
</div>

### Getting Started

First step is to include terraform module [for AWS Landing Zone into your](https://registry.terraform.io/modules/TerraHubCorp/landing-zone) code base. For example:

```
module "landing_zone" {
  source                  = "./modules/landing_zone"
  root_path               = path.module
  landing_zone_providers  = {
    default = {
      account_id = "123456789012"
      region     = "us-east-1"
    }
    [...]
  }
  landing_zone_components = {
    landing_zone_vpc = "s3://terraform-aws-landing-zone/mycompany/landing_zone_vpc/default.tfvars"
    [...]
  }
}
```

>_NOTE: Placeholder […] from above is used to suggest that similar syntax can be added. Remove it or update in order to have valid HCL format._

Definition of `landing_zone_providers` and `landing_zone_components` allow flexible and consistent provisioning of AWS resources across multiple AWS accounts and/or AWS regions. Similar to microservices architecture, customers of this terraform module are encouraged to define one terraform resource per one landing zone component.

For simplicity, we moved both arguments `landing_zone_providers` and `landing_zone_components` into variables. We are manipulating them at runtime by supplying customized `terraform.tfvars`. In this case, our terraform module reference becomes simple and immutable:

```
module "landing_zone" {
  source                  = "./modules/landing_zone"
  root_path               = path.module
  landing_zone_providers  = var.landing_zone_providers
  landing_zone_components = var.landing_zone_components
}
variable "landing_zone_providers" {
  type = map(map(string))
}
variable "landing_zone_components" {
  type = map(string)
}
```

VERY IMPORTANT: You can define lots of providers and include tons of components, but only the ones referenced in associated .tfvars files will be provisioned / deployed by terraform module.

### Common Components

The following components are pretty common across our customers:

- AWS Organization (referenced [here](https://github.com/TerraHubCorp/terraform-aws-landing-zone/blob/master/terraform.tfvars#L22:L26))
- AWS Service Catalog
- AWS IAM, including Identity Providers; excluding AWS SSO
- Amazon VPC, including Subnets, Routes, Gateways, NACLs, Security Groups, Peering or Direct Connect (referenced [here](https://github.com/TerraHubCorp/terraform-aws-landing-zone/blob/master/terraform.tfvars#L27:L40))

As you can see from above mentioned references, the demo `.tfvars` files are stored in `s3://terraform-aws-landing-zone/mycompany/[component_name]/default.tfvars` (publicly available). The goal is to provide reusable structure of immutable configurations that can consistently provision / deploy terraform resources (to be read: AWS resources) across multiple terraform providers (to be read: AWS accounts and/or AWS regions) without any need to make changes to landing zone components. Only `.tfvars` are changed over time.

But more importantly, we can use the same S3 bucket (or create one bucket per customer) and assign IAM temporary credentials (or cross account role) for each customer without exposing private information stored in `.tfvars` files. Every execution of terraform module can clearly delimit IAM credentials (or roles) for where `.tfvars` files are located, where `.tfstate` files are stored as backend and/or where AWS resources are provisioned / deployed.

### Unique Components

Unique components are only unique on architecture diagram, while in reality all components are executed the same, meaning terraform configurations are open source and publicly available, while `.tfvars` files are private and pretty unique to every customer.

And, to be clear, not all landing zone components were creating AWS resources from scratch. For example, some customers already had VPCs or IAMs. In these cases, we used `terraform import` to bring in existing AWS resources and avoid duplicated or colliding resources.

Unfortunately we don’t have written permission to disclose customers names. That is why we will be referencing them below by their revenue from last year.

#### Customer #1: $49B in revenue

<div class="img-post-left">
    <img src="/images/blog/2019-08-01/customer1.png" alt="partner aws" />
</div>

In this case, we worked with a customer who is using the following 3rd party services and tools that are not native to AWS:

- AWS SSO => Office 365
- AWS CodePipeline => Jenkins
- AWS GuardDuty => SignalFX
- Logs => Splunk

As shown in the diagram on the left, terraform based implementation of AWS Landing Zone is perfectly inline with AWS best practices. By replacing AWS native solutions with similar 3 party products, we were able to combine existing solutions and AWS cloud in perfect harmony.

#### Customer #2: $33B in revenue

<div class="img-post-left">
    <img src="/images/blog/2019-08-01/customer2.png" alt="partner aws" />
</div>

In this case, we worked with a customer who is using the following 3rd party services and tools that are not native to AWS:

- AWS SSO => Ping Identity
- AWS CodePipeline => Bamboo
- Amazon S3 => Bitbucket
- AWS Parameter Store => Vault
- AWS GuardDuty => Alert Logic
- Logs => Datadog

Similar to previous customer, the diagram on the left reflects a sustainable customization of AWS Landing Zone solution where some native components to AWS are being replaced with existing comparable 3rd party solutions.

#### Customer #3: $11B in revenue

<div class="img-post-left">
    <img src="/images/blog/2019-08-01/customer3.png" alt="partner aws" />
</div>

In this case, we worked with a customer who is using the following 3rd party services and tools that are not native to AWS:

- AWS SSO => SiteMinder
- AWS CodePipeline => TravisCI
- Amazon S3 => GitHub
- AWS GuardDuty => OSSEC + Grafana
- Logs => Elastic + Grafana

Similar to previous customers, the architecture diagram on the left is a customized version of AWS Landing Zone diagram with several AWS native solutions replace with similar 3rd party services or tools that customer already uses in their organization.

#### Summary

1. This terraform module accepts arguments landing_zone_providers and landing_zone_components among others
2. Providers and components can be as many as you want; Only the ones referenced in .tfvars files will be provisioned / deployed
3. Ideally the code for landing zone components is immutable, while .tfvars files are adjustable over time
4. Microservices architecture is highly recommended, aim for one terraform resource per one landing zone component
5. Use terraform import for existing AWS resources to avoid duplication or collisions with landing zone components

### Conclusion

In this article, we tried to describe relevant level of details associated with technical implementation of AWS Landing Zone solution using terraform module. We talked about 3 different customers without disclosing their names and any private information. Component based immutable terraform configurations with adjustable `.tfvars` files allowed advanced flexibility and reliable consistency across multiple AWS accounts using AWS best practices.
