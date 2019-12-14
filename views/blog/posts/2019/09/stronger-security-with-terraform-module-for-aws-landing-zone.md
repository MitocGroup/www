# title
Stronger Security with Terraform Module for AWS Landing Zone

# description
Terraform module for AWS Landing Zone solution is offering a stronger security promise. Let's dive deeper into main security components and understand some practical implications.

# image
https://www.mitocgroup.com/images/blog/2019-09-18/terraform-module.png

# publicationDate
Wed, 18 September 2019 12:20:55 -0400

# featured
2

---

<div class="padd25px">
    <img src="/images/blog/2019-09-18/terraform-module.png" alt="partner aws" />
    <div class="center img-description">AWS Landing Zone / Terraform Module Components</div>
</div>

The AWS Landing Zone solution includes an initial security baseline that can be used as a starting point for establishing and implementing a customized account security baseline for your organization. By default, the initial security baseline includes the following settings:

- Amazon Virtual Private Cloud (VPC) & Amazon VPC Flow Logs
- AWS CloudTrail & AWS CloudTrail Logs
- AWS Config & AWS Config Rules
- AWS Identity and Access Management (IAM)
- Cross-Account Access via AWS IAM
- AWS Single Sign-On (SSO)
- Amazon GuardDuty
- Security Notifications via Amazon SNS
- and more (e.g. KMS, CloudWatch, Security Hub, etc.)

### Landing Zone Security Components

<div class="img-post-left">
    <img src="/images/blog/2019-09-18/terraform-module-2.png" alt="partner aws" />
    <div class="center img-description">AWS Landing Zone / Terraform Module Components</div>
</div>

Last week we covered in great length of details [Terraform Module Components for AWS Landing Zone Solution](https://www.mitocgroup.com/blog/terraform-module-components-for-aws-landing-zone-solution). We `used landing_zone_vpc` component as a reference to describe what a component is and how does it work. This week we would like to dive deeper into security focused components. Specifically:

- [landing\_zone\_vpc](https://github.com/MitocGroup/terraform-aws-landing-zone/tree/master/components/landing_zone_vpc)
- [landing\_zone\_subnet](https://github.com/MitocGroup/terraform-aws-landing-zone/tree/master/components/landing_zone_subnet)
- [landing\_zone\_security\_group](https://github.com/MitocGroup/terraform-aws-landing-zone/tree/master/components/landing_zone_security_group)
- [landing\_zone\_cloudtrail](https://github.com/MitocGroup/terraform-aws-landing-zone/tree/master/components/landing_zone_cloudtrail)
- [landing\_zone\_config](https://github.com/MitocGroup/terraform-aws-landing-zone/tree/master/components/landing_zone_config)
- [landing\_zone\_iam\_role](https://github.com/MitocGroup/terraform-aws-landing-zone/tree/master/components/landing_zone_iam_role)
- [landing\_zone\_sso](https://github.com/MitocGroup/terraform-aws-landing-zone/tree/master/components/landing_zone_sso)

<div class="padd25px">
    <img src="/images/blog/2019-09-18/service-mapped.png" alt="partner aws" />
    <div class="center img-description">AWS Services Mapped to Landing Zone Security Components</div>
</div>

### Landing Zone VPC

AWS provides security capabilities and services to increase privacy and control network access. For example, Amazon VPC is offering by design built-in network firewalls that isolate AWS resources from both outside world and other inside networks.
[Landing Zone VPC component](https://github.com/MitocGroup/terraform-aws-landing-zone/tree/master/components/landing_zone_vpc) allows customers to customize these network boundaries beyond default settings. Implemented as terraform component, this piece of infrastructure as code empowers users to import existing VPCs (therefore no downtime), as well as create new VPCs that can easily replace current networks or work as an extension to existing networks.

### Landing Zone Subnet

Amazon VPC allows customers to create virtual networks and divide them into subnets. VPC subnets are mapped to specific Availability Zones (AZs) and, therefore, subnet placement is one mechanism to ensure AWS resources are properly distributed across multiple data centers / different physical locations.

[Landing Zone Subnet component](https://github.com/MitocGroup/terraform-aws-landing-zone/tree/master/components/landing_zone_subnet) allows customers to specify the mapping between CIDR block(s) and AZs. As any other terraform implementation, existing subnets can be reused without downtime or created from scratch. Any future AWS resource will be using one (or multiple) subnets to be created (or updated) in any specific AZ (or AZs). This component is directly dependent on Landing Zone VPC.

### Landing Zone Security Group

A security group acts as a virtual stateful firewall that controls the traffic into specific AWS resource. This mandatory firewall is configured in a default deny-all mode and customers must explicitly open the ports needed to allow inbound traffic. Traffic can be restricted by protocol, by service port, and also by source IP address (individual IP or CIDR block) or another security group.

[Landing Zone Security Group component](https://github.com/MitocGroup/terraform-aws-landing-zone/tree/master/components/landing_zone_security_group) allows customers to pinpoint ingress and egress firewall rules. Using terraform implementation, existing rules can be imported and reused without downtime, empowering teams to provision and manage their network level firewalls as code. This component is directly dependent on Landing Zone VPC.

### Landing Zone CloudTrail

AWS CloudTrail is a service that enables governance, compliance, operational auditing, and risk auditing by logging every action to AWS APIs associated with your AWS account(s). With CloudTrail, you can continuously monitor and retain account activity related to actions across your AWS infrastructure.

[Landing Zone CloudTrail component](https://github.com/MitocGroup/terraform-aws-landing-zone/tree/master/components/landing_zone_cloudtrail) allows customers to centralize all logs into single storage location across all accounts linked to AWS Organization. Terraform implementation empowers users to reuse existing trails and/or existing logs without any gaps in historical data. Remember, AWS CloudTrail is not able to back-fill missing logs if turned off or mismanaged.

### Landing Zone Config

AWS Config is a service that maintains a configuration history of your AWS resources and evaluates the configuration against best practices and your internal policies. Config rules can be used to audit your use of AWS for compliance with external compliance frameworks such as the CIS AWS Foundations Benchmark, or with your internal security policies related to the US Health Insurance Portability and Accountability Act (HIPAA), the Federal Risk and Authorization Management Program (FedRAMP), and others.

[Landing Zone Config component](https://github.com/MitocGroup/terraform-aws-landing-zone/tree/master/components/landing_zone_config) allows customers to implement in terraform the recording and the rules needed to manage inventory and configuration of AWS resources, as well as change management to those resources over time. Terraform import can map existing AWS resources to current tfstates and tfvars, while missing recording and/or rules will be created from scratch.

### Landing Zone IAM Role

AWS Identity and Access Management (IAM) enables customers to manage access to AWS services and resources securely. Using IAM, you can create and manage AWS users and groups, and use permissions to allow or deny access to AWS resources.

[Landing Zone IAM Role component](https://github.com/MitocGroup/terraform-aws-landing-zone/tree/master/components/landing_zone_iam_role) allows customers to customize access to AWS resources by managing security controls as terraform configurations. If users already have existing IAM roles, terraform will import and reuse them, otherwise they will be created from scratch.

### Landing Zone SSO

AWS Single Sign-On (SSO) is a cloud service that makes it easy to centrally manage SSO access to multiple AWS accounts and business applications. AWS SSO supports Security Assertion Markup Language (SAML) 2.0 integrations, which extends SSO access to any potential SAML-enabled applications.

[Landing Zone SSO component](https://github.com/MitocGroup/terraform-aws-landing-zone/tree/master/components/landing_zone_sso) allows customers to specify which AWS accounts and/or business applications will be integrated into AWS SSO. Terraform implementation empowers security engineers and teams to reuse existing setup, as well as bring new integrations into this service by using centralized infrastructure as code processes powered by terraform.

### Conclusion

[Terraform module](https://github.com/MitocGroup/terraform-aws-landing-zone) for [AWS Landing Zone](https://aws.amazon.com/solutions/aws-landing-zone/) solution is delivering a promise of a stronger security. This module implements core security services and integrations that are recommended by AWS best practices, as well as industry security and compliance frameworks. As we evolve this module, we will be constantly adding new security focused components (e.g. AWS Security Hub, AWS Control Tower, AWS Transit Gateway, etc).

Share your thoughts and your experience on [LinkedIn](https://linkedin.com/company/mitoc-group), [Twitter](https://twitter.com/mitocgroup), [Facebook](https://facebook.com/mitocgroup) or in the comments section below.
