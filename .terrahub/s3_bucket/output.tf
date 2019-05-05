# Define list of variables to be output

output "id" {
  value = "${aws_s3_bucket.s3_bucket.id}"
}

output "arn" {
  value = "${aws_s3_bucket.s3_bucket.arn}"
}

output "bucket_domain_name" {
  value = "${aws_s3_bucket.s3_bucket.bucket_domain_name}"
}

output "hosted_zone_id" {
  value = "${aws_s3_bucket.s3_bucket.hosted_zone_id}"
}

output "region" {
  value = "${aws_s3_bucket.s3_bucket.region}"
}

output "website_endpoint" {
  value = "${aws_s3_bucket.s3_bucket.website_endpoint}"
}

output "website_domain" {
  value = "${aws_s3_bucket.s3_bucket.website_domain}"
}

output "index_trigger" {
  value = "${data.aws_s3_bucket_object.s3_bucket_object.last_modified}"
}
