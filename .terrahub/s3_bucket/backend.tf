terraform {
  backend "s3" {
    bucket               = "data-lake-mitocgroup-us-east-1"
    key                  = "terraform/mitocgroup/www/s3_bucket/terraform.tfstate"
    region               = "us-east-1"
    workspace_key_prefix = "terraform_workspaces"
  }
}
