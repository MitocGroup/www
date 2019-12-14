# title
My Architecture: Private Equity Platform on AWS Cloud

# description
Over the last couple of years we have been working closely with several private equity companies to help them adopt public clouds. This article will describe the high level architecture of a leading private equity platform on AWS cloud.

# image
https://www.mitocgroup.com/images/blog/2019-09-10/private-equity-platform.png

# publicationDate
Tue, 10 September 2019 12:20:55 -0400

# featured
4

---

<div class="padd25px">
    <img src="/images/blog/2019-09-10/private-equity-platform.png" alt="partner aws" />
    <div class="center img-description">Private Equity Platform on AWS Cloud</div>
</div>

### Private Equity Sector

Private equity industry is pretty unique in the financial world because it offers important long-term advantages, including strong historical returns and diversification benefits. From a technical perspective, public clouds are becoming very important factors to private equity firms because of speed and agility combined with better results at lower costs.

Historically, private equity platforms were built and deployed on-premises, primarily driven by the private nature of the industry and the need to protect the secret sauce of deal making processes. Providers like AWS and GCP have become more relevant and very important to the industry because they proved over time that you can have it both ways: private and secure, as well as faster and cheaper.

### Leading Private Equity Platform

Since we don't have a written permission to name the brand and the product, we will refer to this platform as leading private equity platform. We hope that in the future the company behind this platform will reconsider their position and allow us to be more specific.

This leading private equity platform allows PE companies to manage:

- Investor Tracking
- Portfolio Management
- Customer Relationship Management
- Accounting
- Reporting and Auditing
- Batch Data Processing
- Business Events and Business Rules
- Team Security and Admin Tools

### Reference Architecture on AWS Cloud

<div class="img-post-left">
    <img src="/images/blog/2019-09-10/reference-arch.png" alt="partner aws" />
    <div class="center img-description">Reference Architecture on AWS Cloud</div>
</div>

Our team put together the reference architecture for leading private equity platform based on best practices described in [Web Application Hosting in the AWS Cloud](https://d0.awsstatic.com/whitepapers/aws-web-hosting-best-practices.pdf) white-paper and customers requirements to run it in highly available and highly scalable mode (see the picture on the left).
Customers / end users of leading private equity platform are connecting from personal computers, or mobile devices, or virtual desktops like Citrix and Amazon Workspaces to a DNS service called Amazon Route 53.

### Networking

Amazon Route 53's latency based routing directs the customer to the closest AWS region (in our case, either North Virginia or Oregon) and corresponding ALB (which stands for Application Load Balancer). Reference architecture leverages 2 AWS regions and 3 AWS availability zones. The life of any chain of requests is lived in the region selected by Amazon Route 53 at the beginning and never goes across regions during its short lifetime.

When a PE company wants to save on infrastructure costs, we help them by reducing the number of active availability zones or, sometimes, the number of active regions, which results in reduced SLAs.

The ALB from above can be either public or private. Public means that underlying subnets are connecting to the Internet directly through Amazon's Internet Gateway. Private means that underlying subnets are connecting to the Internet through customer's data center(s) via Direct Connect or some other Private Gateway.

### Web Servers

This ALB proxies requests to a cluster of Amazon EC2 instances called Web Servers via port 443 (managed through WebSG security group). Each Web Server includes static components like HTML, CSS and JavaScript, as well as dynamic components like .NET 4.5/C# and IIS 7/8 running on top of Windows Server 2008/2012. These instances are wrapped into an ASG (aka Auto Scaling Group) to provide elasticity when needed. Everything is encrypted in transit and at rest.

### App Servers

Traffic from Web Servers is directed to a second ALB that is internal. This ALB proxies requests to a cluster of Amazon EC2 instances called App Servers via port 443 (managed through AppSG security group). Each App Server works as an internal API to the platform that includes .NET 4.5/C# and IIS 7/8 running on top of Windows Server 2008/2012. These instances are wrapped into an ASG (aka Auto Scaling Group) to provide elasticity when needed. Everything is encrypted in transit and at rest.

API functionality includes multiple layers like Web Services, Dynamic Web Forms, Business Rules and Business Events, Reporting Engine and Audit Engine, Domain Models, Data Access Objects and many others.

### Database

Traffic from App Servers is directed to Amazon RDS for SQL Server cluster which consists of master node and standby node. Only master node is available for querying, while standby node isn't exposed until master becomes unavailable. This RDS capability is called Multi-AZ and uses SQL Server's native Always On feature. Everything is encrypted in transit and at rest.

Running Amazon RDS for SQL Server cross region replication is still a challenge that doesn't have a native solution yet. Luckily, AWS introduced last year [ongoing replication from Amazon RDS for SQL Server using AWS Database Migration Service.](https://aws.amazon.com/blogs/database/introducing-ongoing-replication-from-amazon-rds-for-sql-server-using-aws-database-migration-service/)

### Security

Security and Compliance on AWS is achieved using shared responsibility model. This means that cloud provider operates, manages and controls the components from the host operating system and virtualization layer down to the physical security of the facilities in which the service operates. Everything else is customer's responsibility.

Reference architecture for leading private equity platform on AWS cloud makes it easier and faster to achieve a secure environment using industry's best practices. Just to name a couple:

- Everything is encrypted in transit and at rest
- Keys and other secrets are rotated on regular basis
- Security groups and IAM roles are following least privilege principle
- Infrastructure resources are deployed in private subnets where necessary

### Conclusion

Running leading private equity platform on AWS cloud is a privilege that comes with a lot of challenges. We overcame those challenges by putting together a reference architecture and by continuing to help PE companies through successful customers' experience.

Share your thoughts and your experience on [LinkedIn](https://linkedin.com/company/mitoc-group), [Twitter](https://twitter.com/mitocgroup), [Facebook](https://facebook.com/mitocgroup) or in the comments section below.
