# title
My Architecture: AWS Control Tower vs AWS Landing Zone

# description
Both Control Tower and Landing Zone help set up and manage secure multi-account AWS environments. Which one should customers use? Let's take a closer look and figure out together.

# image
https://www.mitocgroup.com/images/blog/2019-09-20/aws-reinforce.png

# publicationDate
Fri, 20 September 2019 12:20:55 -0400

# featured
1

---

<div class="img-post-left">
    <img src="/images/blog/2019-09-20/aws-reinforce.png" alt="Multiaccount AWS Environments" />
    <div class="center img-description">Source:
       <a href="https://www.slideshare.net/AmazonWebServices/using-aws-control-tower-to-govern-multiaccount-aws-environments-at-scale-grc313r-aws-reinforce-2019" target="_blank">https://www.slideshare.net/AmazonWebServices/using-aws-control-tower-to-govern-multiaccount-aws-environments-at-scale-grc313r-aws-reinforce-2019</a>
    </div>
</div>

### What is AWS Control Tower?

[Quote](https://aws.amazon.com/controltower/faqs/#General) : AWS Control Tower is a service that offers the easiest way to set up and govern a new, secure, multi-account AWS environment. It establishes a landing zone that is based on best-practices blueprints, and enables governance using guardrails you can choose from a pre-packaged list. The landing zone is a well-architected, multi-account baseline that follows AWS best practices. Guardrails implement governance rules for security, compliance, and operations.

<div class="img-post-left">
    <img src="/images/blog/2019-09-20/automating-lz.png" alt="AWS Landing Zone Deployment" />
    <div class="center img-description">Source:
       <a href="https://aws.amazon.com/blogs/apn/automating-your-aws-landing-zone-deployment-to-speed-up-large-scale-migrations" target="_blank">https://aws.amazon.com/blogs/apn/automating-your-aws-landing-zone-deployment-to-speed-up-large-scale-migrations</a>
    </div>
</div>

### What is AWS Landing Zone?

[Quote](https://aws.amazon.com/solutions/aws-landing-zone/): AWS Landing Zone is a solution that helps customers more quickly set up a secure, multi-account AWS environment based on AWS best practices. With the large number of design choices, setting up a multi-account environment can take a significant amount of time, involve the configuration of multiple accounts and services, and require a deep understanding of AWS services.

### AWS Control Tower vs AWS Landing Zone

Although official documentation explains [the difference between AWS Control Tower and AWS Landing Zone](https://aws.amazon.com/controltower/faqs/#AWS_Solution_and_Service_Comparisons), we believe that customers should learn more details about these two offerings. And keep in mind, these solutions are not apples to apples comparable, more like apples to oranges.
AWS Landing Zone solution was launched in [June 2018](https://aws.amazon.com/about-aws/whats-new/2018/06/introducing-aws-landing-zone/), while AWS Control Tower was announced in [November 2018](https://aws.amazon.com/blogs/enterprise-strategy/aws-control-tower-and-aws-security-hub-powerful-enterprise-twins/) and launched in [June 2019](https://aws.amazon.com/about-aws/whats-new/2019/06/aws-control-tower-is-now-generally-available/). It's not very clear why in just a couple of months AWS introduced two competing products. Based on our limited experience, we would assume AWS Landing Zone solution was very well received by enterprise customers, but in the same time required fundamental changes which led to AWS Control Tower service.
As of time of writing, AWS Control Tower doesn't support existing setups for AWS Organization or AWS SSO, although official FAQ claims it will be added in the future, as well as ability to migrate from AWS Landing Zone solution to AWS Control Tower service.

Service or Feature                       | AWS Control Tower         |   AWS Landing Zone
-----------------------------------------|---------------------------|----------------------------
New AWS Organization account             | &#x2705; yes              | &#x2705; yes
Existing AWS Organization account        | &#x274C; no               | &#x2705; yes
New AWS SSO environment                  | &#x2705; yes              | &#x2705; yes
Existing AWS SSO environment             | &#x274C; no               | &#x2705; yes
New AWS Service Catalog environment      | &#x2705; yes              | &#x2705; yes
Existing AWS Service Catalog environment | &#x274C; no               | &#x2705; yes
New or Existing Security Hub environment | &#x2705; yes              | &#x274C; no
Support for CI/CD                        | &#x274C; no               | &#x2705; yes
Interactive APIs                         | &#x274C; no               | &#x274C; no
CloudFormation template(s)               | &#x274C; no               | &#x2705; yes
Terrafom module(s)                       | &#x274C; no               | &#x2705; yes

### Conclusion
Therefore, in summary, which one should we use: AWS Control Tower or AWS Landing Zone? The answer is: depends. If you start from scratch or can afford destroying existing AWS resources, then AWS Control Tower is the way forward. Otherwise, consider AWS Landing Zone and fingers crossed for future migration solution from AWS Landing Zone to AWS Control Tower.

Share your thoughts and your experience on [LinkedIn](https://linkedin.com/company/mitoc-group), [Twitter](https://twitter.com/mitocgroup), [Facebook](https://facebook.com/mitocgroup) or in the comments section below.
