# Define list of variables to be output

output "id" {
  value = "${aws_cloudfront_distribution.cloudfront_distribution.id}"
}

output "arn" {
  value = "${aws_cloudfront_distribution.cloudfront_distribution.arn}"
}

output "status" {
  value = "${aws_cloudfront_distribution.cloudfront_distribution.status}"
}

output "domain_name" {
  value = "${aws_cloudfront_distribution.cloudfront_distribution.domain_name}"
}

output "etag" {
  value = "${aws_cloudfront_distribution.cloudfront_distribution.etag}"
}

output "hosted_zone_id" {
  value = "${aws_cloudfront_distribution.cloudfront_distribution.hosted_zone_id}"
}

output "last_modified_time" {
  value = "${aws_cloudfront_distribution.cloudfront_distribution.last_modified_time}"
}

output "in_progress_validation_batches" {
  value = "${aws_cloudfront_distribution.cloudfront_distribution.in_progress_validation_batches}"
}

output "caller_reference" {
  value = "${aws_cloudfront_distribution.cloudfront_distribution.caller_reference}"
}

output "active_trusted_signers" {
  value = "${aws_cloudfront_distribution.cloudfront_distribution.active_trusted_signers}"
}
