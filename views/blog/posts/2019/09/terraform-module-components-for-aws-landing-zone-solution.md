# Featured
3

# Author
Eugene Istrati

# AboutAuthor
Proud Father. Lucky Husband. Open Source Contributor. DevOps | Automation | Serverless @MitocGroup. Former @AWScloud and @HearstCorp.

# Avatar
eistrati.png

# TwitterUsername
eistrati

# PublicationDate
Fri, 13 Septembre 2019 12:20:55 -0400

# Thumbnail
/images/blog/2019-09-13/code.png

# Title
Terraform Module Components for AWS Landing Zone Solution

# Intro
The core innovation in terraform module for AWS Landing Zone solution is the immutable nature of components. Let's dive deeper into what a component is and how does it work.

---

To make sure that everybody has the same understanding about [Terraform Module for AWS Landing Zone](https://github.com/MitocGroup/terraform-aws-landing-zone#how-does-this-module-work) solution, here below is how [this module](https://github.com/MitocGroup/terraform-aws-landing-zone/blob/master/main.tf) looks like at the time of writing:

<div class="padd25px">
    <img src="/images/blog/2019-09-13/code.png" alt="partner aws" />
</div>

And if we take a look at [terraform.tfvars](https://github.com/MitocGroup/terraform-aws-landing-zone/blob/master/terraform.tfvars), we should see something like this:

```
landing_zone_providers = {
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
terraform_backend = {
  backend = "local"
  path    = "/tmp/.terrahub/landing_zone"
}
```

### Immutable Nature of Landing Zone Components
AWS Landing Zone solution addresses the challenge of managing multiple accounts in a faster and more secure manner, following AWS best practices. AWS empowers customers to use immutable patterns for resource allocation, but the complexity of managing terraform or cloudformation scripts that manages those resources is still pretty big.

That is why terraform module for AWS Landing Zone is designed to be dynamic, therefore reducing management complexity while still keeping high level of security. Each element of `landing_zone_components` variable is a pair where the key is component's name (immutable and static) and the value is path to `.tfvars` file (mutable and dynamic). This setup allows customers to focus on dynamic aspects of their AWS environments, while terraform codebase almost never changes.

>_NOTE: In case some terraform config would need to change, instead of updating existing component, create a new one and update `landing_zone_components` list._

### The Structure of Landing Zone Components

When looking at each component defined in `landing_zone_components` map, the first issue that jumps into our sight is YAML format instead of HCL (Why? More on this later…) But what's more important at this point is the emerging repeatable pattern. For example, [landing\_zone\_vpc](https://github.com/MitocGroup/terraform-aws-landing-zone/blob/master/components/landing_zone_vpc/.terrahub.yml) looks something like this:

```
component:
  name: landing_zone_vpc
  template:
    locals:
      elements_landing_zone_vpc_map: var.${tfvar.terrahub["landing_zone_providers"]["0"]}_provider["landing_zone_vpc_resource"]
      [...]
    resource:
      aws_vpc:
        landing_zone_vpc:
          provider: 'aws.${tfvar.terrahub["landing_zone_providers"]["0"]}'
          count: length(var.${tfvar.terrahub["landing_zone_providers"]["0"]}_provider["landing_zone_vpc_resource"])
          cidr_block: local.elements_landing_zone_vpc_map["config_${count.index}"]["cidr_block"]
          [...]
    output:
      [...]
```

And the corresponding [default.tfvars](https://terraform-aws-landing-zone.s3.amazonaws.com/mycompany/landing_zone_vpc/default.tfvars) (from _s3://terraform-aws-landing-zone/mycompany/landing\_zone\_vpc/default.tfvars_) looks like this:

```
landing_zone_providers = [
  "default"
]
default_provider = {
  landing_zone_vpc_tags_element = {
    config_0 = {
      Name        = "VPC for Landing Zone"
      Description = "Managed by TerraHub"
      ThubCode    = "1234abcd"
      ThubEnv     = "prod"
    }
  },
  landing_zone_vpc_resource = {
    config_0 = {
      cidr_block                       = "172.16.0.0/16"
      instance_tenancy                 = "default"
      assign_generated_ipv6_cidr_block = "false"
      enable_classiclink               = "false"
      enable_classiclink_dns_support   = "false"
      enable_dns_support               = "true"
      enable_dns_hostnames             = "false"
    }
  }
}
```

Let's connect these two pieces from above:

- [Line 10](https://github.com/MitocGroup/terraform-aws-landing-zone/blob/master/components/landing_zone_vpc/.terrahub.yml#L10): this component will create terraform resource [aws_vpc](https://www.terraform.io/docs/providers/aws/r/vpc.html)
- [Line 12](https://github.com/MitocGroup/terraform-aws-landing-zone/blob/master/components/landing_zone_vpc/.terrahub.yml#L12): this component will create separate terraform provider [aws](https://www.terraform.io/docs/providers/aws/index.html) for each value from `landing_zone_providers` variable (which in practice how AWS accounts and AWS regions are separated in terraform)
- [Line 14](https://github.com/MitocGroup/terraform-aws-landing-zone/blob/master/components/landing_zone_vpc/.terrahub.yml#L14): this component will iterate through `landing_zone_providers`, expecting specific variable for each provider (e.g. `default_provider`); that is why it's required to define all `[provider_name]_provider` variables (e.g. if `landing_zone_providers` has values `default`, `alpha` and `beta`, it's expected .tfvars file(s) to define variables `default_provider`, `alpha_provider` and `beta_provider`)
- [Line 16](https://github.com/MitocGroup/terraform-aws-landing-zone/blob/master/components/landing_zone_vpc/.terrahub.yml#L16): this component uses `count` to iterate through resources defined by variable `landing_zone_vpc_resource`; to use native terraform capability, define `[component_name]_resource` values as iterate-able list of elements `config_[iterator]` (e.g. `config_0`, `config_1`, and so on)

Ideal proposed structure for `.tfvars` file(s) should be the following:

```
landing_zone_providers = [
  "default"
  "{{alpha_provider}}"
  "{{beta_provider}}"
  [...]
]
default_provider = {
  {{component_name}}_resource = {
    config_0 = {
      [...]
    },
    config_1 = {
      [...]
    },
    [...]
  }
}
{{alpha_provider}}_provider = {
  {{component_name}}_resource = {
    [...]
  }
}
{{beta_provider}}_provider = {
  [...]
}
[...]
```

### Landing Zone Components Using YAML Instead of HCL

Consider the following: Our goal for this terraform module is to empower users to do less by using native terraform capabilities, but we couldn't do that primarily because HCL doesn't allow usage of variables inside `.tfvars` files and doesn't support iterations through providers. For these reasons (and a couple of more) we opted into using [terrahub cli](https://npmjs.com/package/terrahub) — terraform automation and orchestration tool.

When executing `terraform init` and `terraform apply` on `landing_zone module`, the underlying code triggers `terrahub run` for entire list of `landing_zone_components`. Internally, landing zone components in YAML format are converted into HCL. This terrahub feature is called JIT (aka Just In Time) and, as the name suggests, YAML configs are converted into HCL in real-time during terraform workflow execution.

For example, above mentioned component [landing\_zone\_vpc](https://github.com/MitocGroup/terraform-aws-landing-zone/blob/master/components/landing_zone_vpc/.terrahub.yml) defined as `.yml` file will be converted into the following set of `.tf` files:

```
$ ls ~/.terrahub/cache/jit/landing_zone_vpc_eef16dcf/
README.md    default.tfvars    locals.tf    main.tf        output.tf    provider.tf    terraform.tf    variable.tf
```

>_NOTE: In order to debug JIT converted files from YAML format into HCL go to **~/.terrahub/cache/jit/** folder and explore corresponding component(s). If specific component is missing, execute `terrahub run -i [component_name]` in order to generate corresponding `[component_name]_[hash]` folder and `.tf` files._

### Putting Everything Together

After putting everything together, we get a very powerful terraform module:

```
$ terraform init
Initializing modules...
- landing_zone in modules/landing_zone

[...]
```

and

```
$ terraform apply
An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create
[...]
Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
```

And that's it. We hope it helps.

Share your thoughts and your experience on [LinkedIn](https://linkedin.com/company/mitoc-group), [Twitter](https://twitter.com/mitocgroup), [Facebook](https://facebook.com/mitocgroup) or in the comments section below.
