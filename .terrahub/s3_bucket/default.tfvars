# Specify default values for variables defined in variables.tf

############
# provider #
############
account_id = "492198229272"
region     = "us-east-1"

#############
# top level #
#############
s3_bucket_name          = "www-dev.mitocgroup.com"
s3_bucket_acl           = "public-read"
s3_bucket_region        = "us-east-1"
s3_bucket_force_destroy = "true"

#############
# cors rule #
#############
s3_bucket_cors_rule_allowed_headers = ["*"]
s3_bucket_cors_rule_allowed_methods = ["HEAD", "GET", "PUT", "POST", "DELETE"]
s3_bucket_cors_rule_allowed_origins = ["*"]
s3_bucket_cors_rule_expose_headers  = ["ETag"]
s3_bucket_cors_rule_max_age_seconds = "0"

##############
# versioning #
##############
s3_bucket_versioning_enabled    = false
s3_bucket_versioning_mfa_delete = false

###########
# website #
###########
s3_bucket_website_index_document = "index.html"
s3_bucket_website_error_document = "/404.html"

########
# tags #
########
default_tags = {
  "Name"        = "s3_bucket"
  "Description" = "Managed by TerraHub"
  "ThubCode"    = "eee23249"
  "ThubEnv"     = "default"
}
custom_tags = {}
