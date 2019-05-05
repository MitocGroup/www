# Specify default values for variables defined in variables.tf

##########
# custom #
##########
s3_bucket_remote_state_key = "terraform_workspaces/stage/terraform/mitocgroup/www/s3_bucket/terraform.tfstate"
aliases                    = ["www-stage.mitocgroup.com"]
comment                    = "www-stage.mitocgroup.com"
origin_id                  = "S3-Website-www-stage.mitocgroup.com.s3-website-us-east-1.amazonaws.com"
origin_domain_name         = "www-stage.mitocgroup.com.s3-website-us-east-1.amazonaws.com"
custom_tags = {
  "ThubEnv" = "stage"
}
