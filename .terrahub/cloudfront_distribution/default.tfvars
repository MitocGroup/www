# Specify default values for variables defined in variables.tf

############
# provider #
############
account_id = "492198229272"
region     = "us-east-1"

#############
# top level #
#############
backend                       = "s3"
s3_bucket_remote_state_bucket = "data-lake-mitocgroup-us-east-1"
s3_bucket_remote_state_key    = "terraform/mitocgroup/www/s3_bucket/terraform.tfstate"
aliases                       = ["www-dev.mitocgroup.com"]
ordered_cache_behavior        = []
comment                       = "www-dev.mitocgroup.com"
custom_error_response = [{
  error_caching_min_ttl = "300"
  error_code            = "404"
  response_code         = "404"
  response_page_path    = "/404.html"
}]
default_root_object = "index.html"
enabled             = "true"
is_ipv6_enabled     = "true"
http_version        = "http2"
price_class         = "PriceClass_All"
environment         = "development"

##################
# cache behavior #
##################
allowed_methods                   = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
cached_methods                    = ["GET", "HEAD", "OPTIONS"]
compress                          = "true"
max_ttl                           = "31536000"
default_ttl                       = "86400"
min_ttl                           = "0"
viewer_protocol_policy            = "redirect-to-https"
forward_headers                   = []
forward_query_string              = "false"
forward_cookies                   = "none"
forward_cookies_whitelisted_names = []

##################
# logging config #
##################
#log_s3_bucket       = ""
#log_s3_prefix       = ""
#log_include_cookies = "false"

#################
# origin config #
#################
origin_id                = "S3-Website-www-dev.mitocgroup.com.s3-website-us-east-1.amazonaws.com"
origin_domain_name       = "www-dev.mitocgroup.com.s3-website-us-east-1.amazonaws.com"
origin_path              = ""
origin_http_port         = "80"
origin_https_port        = "443"
origin_protocol_policy   = "http-only"
origin_ssl_protocols     = ["TLSv1", "TLSv1.1", "TLSv1.2"]
origin_keepalive_timeout = "5"
origin_read_timeout      = "30"

################
# restrictions #
################
geo_restriction_type      = "none"
geo_restriction_locations = []

######################
# viewer certificate #
######################
acm_certificate_arn            = "arn:aws:acm:us-east-1:492198229272:certificate/5de00f26-7e09-40e2-bb2b-08fb4fd0b66d"
ssl_support_method             = "sni-only"
minimum_protocol_version       = "TLSv1.1_2016"
cloudfront_default_certificate = "false"

########
# tags #
########
default_tags = {
  "Name"        = "cloudfront_distribution"
  "Description" = "Managed by TerraHub"
  "ThubCode"    = "eee23249"
  "ThubEnv"     = "default"
}
custom_tags = {}
