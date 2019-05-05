data "terraform_remote_state" "s3_bucket" {
  backend = "${var.backend}"
  config {
    bucket = "${var.s3_bucket_remote_state_bucket}"
    key    = "${var.s3_bucket_remote_state_key}"
    region = "${var.region}"
  }
}
