# title
AWS Landing Zone module now supports Terraform v0.12+

# description
Couple of weeks ago we were excited to Introduce Programmatic AWS Landing Zone as Terraform Module. Today we continue this exciting journey to extend module's support for Terraform v0.12+

# image
https://www.mitocgroup.com/images/blog/2019-08-20/terraform.png

# publicationDate
Tue, 20 August 2019 12:20:55 -0400

---

<div class="padd25px">
    <img src="/images/blog/2019-08-20/terraform.png" alt="Terraform Module Registry" />
    <div class="center img-description">
       <a href="https://registry.terraform.io/modules/MitocGroup/landing-zone/aws" target="_blank">https://registry.terraform.io/modules/MitocGroup/landing-zone/aws</a>
    </div>
</div>

Back in May 2019, HashiCorp announced the release of Terraform 0.12, a major update that includes dozens of improvements and features spanning the breadth and depth of Terraform's functionality. Unfortunately, this release breaks compatibility with previous version and requires extra effort to upgrade (see [Upgrade to Terraform v0.12](https://www.terraform.io/upgrade-guides/0-12.html)).

When we initially started [Terraform Module for AWS Landing Zone](https://github.com/MitocGroup/terraform-aws-landing-zone), our components were developed using v0.11. We decided to release with older version and later address support for newer version. Today we are excited to announce that current implementation supports both v0.11 and below, as well as v0.12 and above.

### What Changed?

Additionally to Terraform syntax change from HCL1 to HCL2, we refactored components related convertor to switch from YAML to HCL instead of JSON. This feature allows easier debugging and fixing of Terraform related issues and remove any potential problems associated with conversion from one format into another.
The flexibility of passing a dynamic number of components as input variables is managed by several python scripts. We rewrote these supporting python scripts into nodejs scripts, therefore removing extra dependencies and simplifying this terraform module.

But the most important improvement that we were able to achieve, with the help from the open source community, is to publish a [high level roadmap](https://github.com/MitocGroup/terraform-aws-landing-zone/blob/master/ROADMAP.md). It gives an overview of how much effort it took so far and how much more effort it will take to add 3rd party support that goes beyond standard AWS offering.

### Conclusion

Terraform Module for AWS Landing Zone is fully functional, supporting both Terraform v0.11 and below, as well as Terraform v0.12 and above. Latest version is published on Terraform Module Registry: [https://registry.terraform.io/modules/MitocGroup/landing-zone/aws](https://registry.terraform.io/modules/MitocGroup/landing-zone/aws)

Share your thoughts and your experience on [LinkedIn](https://linkedin.com/company/mitoc-group), [Twitter](https://twitter.com/mitocgroup), [Facebook](https://facebook.com/mitocgroup) or in the comments section below.
