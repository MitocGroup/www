# Specify default values for variables defined in variables.tf

##########
# custom #
##########
s3_bucket_remote_state_key = "terraform_workspaces/test/terraform/mitocgroup/www/s3_bucket/terraform.tfstate"
aliases                    = ["www-test.mitocgroup.com"]
comment                    = "www-test.mitocgroup.com"
origin_id                  = "S3-Website-www-test.mitocgroup.com.s3-website-us-east-1.amazonaws.com"
origin_domain_name         = "www-test.mitocgroup.com.s3-website-us-east-1.amazonaws.com"
custom_tags = {
  "ThubEnv" = "test"
}
