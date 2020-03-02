# title
Three Success Stories of AWS Landing Zone (Business Overview)

# description
After Introducing Terraform Module for AWS Landing Zone couple of days ago, let's dive deep into several use cases and see how this technical solution solves real business problems.

# image
https://www.mitocgroup.com/images/blog/2019-06-17/aws-arch.png

# publicationDate
Fri, 19 June 2019 12:20:55 -0400

---

In this article, we will be speaking on behalf of 3 different customers without disclosing their names and any private information. These large organizations generate billions of dollars in yearly revenue and, implicitly, come with high level of complexity on AWS. There are lots of challenges and use cases, most of them are pretty common, but also enough of them that are pretty unique. We will provide only a business overview, while the technical overview will be described in a future article.

### What Does AWS Landing Zone Solution Do?

AWS Landing Zone is a solution that helps customers more quickly set up a secure, multi-account AWS environment based on AWS best practices. With the large number of design choices, setting up a multi-account environment can take a significant amount of time, involve the configuration of multiple accounts and services, and require a deep understanding of AWS services.

This solution can help save time by automating the set-up of an environment for running secure and scalable workloads while implementing an initial security baseline through the creation of core accounts and resources. It also provides a baseline environment to get started with a multi-account architecture, identity and access management, governance, data security, network design, and logging.

<div class="img-post-left">
    <img src="/images/blog/2019-06-17/aws-arch.png" alt="AWS Landing Zone" />
    <div class="center img-description">AWS Landing Zone Architecture (source:
       <a href="https://aws.amazon.com/solutions/aws-landing-zone/" target="_blank">https://aws.amazon.com/solutions/aws-landing-zone/</a>)
    </div>
</div>

The AWS Landing Zone solution includes 4 basic AWS accounts: (1) AWS Organization Account, (2) Shared Services Account, (3) Log Archive Account and (4) Security Account. This solution also integrates into add-on products that can be deployed using the AWS Service Catalog such as AWS Managed AD and Directory Connector for AWS Single Sign-On (SSO).

The AWS Landing Zone solution also deploys an AWS Account Vending Machine (AVM) product for provisioning and automatically configuring new AWS accounts. The AVM leverages AWS SSO for managing user account access. This environment is customizable to allow customers to implement their own account baselines through a Landing Zone configuration.

### Why Is AWS Landing Zone Solution So Successful?

In order to dive deep and understand how [Terraform Module for AWS Landing Zone](https://www.mitocgroup.com/blog/introducing-programmatic-aws-landing-zone-as-terraform-module/) helps, we decided to put on our customers hats and tell customers stories through their experiences. For simplicity and respect for their privacy, we will not be disclosing their names and we will not be providing any private information.

#### Customer #1

Large media and entertainment company, with business presence and technical operations all over the world, customer #1 adopted cloud first strategy and required help to setup multi-account approach on AWS cloud using github, concourse and terraform. Their strategy directed cloud operations team to build out couple of dozens of AWS accounts as extension to their existing data centers and provide the same level of security and compliance as on-prem.

#### Customer #2

Large content analytics company, with technical teams in US, EU and India, customer #2 decided to migrate and fully transform themselves on AWS. The multi-year migration effort resulted in hundreds of applications running of several thousands of servers to be rehosted / refactored / revised / rebuilt / replaced. Their entire IT footprint ended up running on over fifty AWS accounts with four members of centralized cloud operations team using github, jenkins and terraform.

#### Customer #3

Large insurance company, with global presence in and highly regulated by almost every country in the world, customer #3 continues its multi-year cloud journey. With hundreds of AWS accounts, various business units are moving slowly and incrementally parts of IT footprint to AWS by provisioning cloud resources as extensions to their on-prem data centers. Cloud operations teams use bitbucket, bamboo and terraform to manage and operate on AWS.

#### Common Denominators

1. VCS —Overwhelming majority of enterprise organizations use some kind of Version Control System, either we are talking about github, bitbucket or others. Not in scope for now, so I'll skip this part.
2. CI/CD — Cloud providers empowered many large companies to adopt some kind of Continuous Integration and Continuous Delivery (or Deployment). Not in scope for now, so I'll skip this as well.
3. Terraform — It doesn't come anymore as a surprise that lots of enterprise customers with large IT footprints are using terraform to provision cloud resources, therefore I'll skip this part.
4. (Lots of) AWS accounts — No matter how many cloud accounts (to be read: several, dozens or even hundreds), customers want to follow best practices recommended by cloud providers that ideally are consistent with their existing policies / procedures and, why not, even improve their operations by making them better and more secure.

### Multi-Account Strategy

Why are customers opting into multi-account strategy? First, although customers can clearly separate users / data / environments using IAM, VPC, SG and STS, single-account strategy requires a vast amount of management and cost allocation that is usually not feasible. Second, if you plan to acquire other companies, integrating into single-account strategy is very expensive. Therefore, it's a non starter.

In this context, the allocation of AWS accounts are usually decided by:

1. Business Unit (or some other kind of legal organizational breakdown)
2. Geographical Location (or some other kind of territorial breakdown)
3. Production vs Non-Production (or some other kind of environment / SDLC breakdown)
4. Shared Services (use cases that are shared or can't / shouldn't be isolated)

>_NOTE: All of our customers, including Customer #1, Customer #2 and Customer #3 followed this best practice as part of their multi-account strategy._

Multi-account strategy doesn't stop just at multiple AWS accounts. The goal of AWS Landing Zone is to have a minimal baseline setup for security, operations and management functions. For example, Customer #1 decided to include in the baseline only Centralized Billing, 3rd party SSO and AWS Direct Connect. Customer #2 and Customer #3 decided to, additionally, add Centralized Logging solution and Centralized Security solution. Some solutions were cloud native services on AWS like Cloudtrail, Managed AD and SSO, others not so native — Splunk, SignalFX, CloudCheckr and PingIdentity.

To go one step further, some customers adopt AVM (Account Vending Machine) to provision new AWS accounts and deploy the baseline into those accounts as well. In our experience, neither Customer #1, Customer #2, nor Customer #3 opted into using this solution. Instead, they use Service Catalog to allow existing / predefined AWS accounts to use only AWS products vetted and whitelisted by their organizations.

At the end of the day, either AWS accounts are created manually or automatically, customers decide what goes into the baseline and how the provisioning and deployment of AWS Landing Zone components are done (spoiler alert: auto-magically). This is the real value of successful AWS Landing Zone implementation.

### Conclusion

In this article, we tried to describe important business aspects of successfully adopting AWS Landing Zone. We talked about 3 different customers without disclosing their names and any private information. These large organizations generate billions of dollars in yearly revenue and, implicitly, come with high level of complexity on AWS. We intentionally stopped short on the technical side of this solution because we will be covering that next (link coming soon).

Share your thoughts and your experience on [LinkedIn](https://linkedin.com/company/mitoc-group), [Twitter](https://twitter.com/mitocgroup), [Facebook](https://facebook.com/mitocgroup) or in the comments section below.
