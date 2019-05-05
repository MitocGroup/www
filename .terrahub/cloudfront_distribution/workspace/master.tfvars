# Specify default values for variables defined in variables.tf

##########
# custom #
##########
s3_bucket_remote_state_key = "terraform_workspaces/master/terraform/mitocgroup/www/s3_bucket/terraform.tfstate"
aliases                    = ["www.mitocgroup.com"]
comment                    = "www.mitocgroup.com"
origin_id                  = "S3-Website-www.mitocgroup.com.s3-website-us-east-1.amazonaws.com"
origin_domain_name         = "www.mitocgroup.com.s3-website-us-east-1.amazonaws.com"
custom_tags = {
  "ThubEnv" = "master"
}
