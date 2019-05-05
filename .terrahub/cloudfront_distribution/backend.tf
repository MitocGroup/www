terraform {
  backend "s3" {
    bucket               = "data-lake-mitocgroup-us-east-1"
    key                  = "terraform/mitocgroup/www/cloudfront_distribution/terraform.tfstate"
    region               = "us-east-1"
    workspace_key_prefix = "terraform_workspaces"
  }
}
