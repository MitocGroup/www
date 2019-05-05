resource "aws_cloudfront_distribution" "cloudfront_distribution" {
  # top level
  aliases                = ["${var.aliases}"]
  ordered_cache_behavior = ["${var.ordered_cache_behavior}"]
  comment                = "${var.comment}"
  custom_error_response  = ["${var.custom_error_response}"]
  default_root_object    = "${var.default_root_object}"
  enabled                = "${var.enabled}"
  is_ipv6_enabled        = "${var.is_ipv6_enabled}"
  http_version           = "${var.http_version}"
  price_class            = "${var.price_class}"

  # cache behavior
  default_cache_behavior {
    allowed_methods        = "${var.allowed_methods}"
    cached_methods         = "${var.cached_methods}"
    compress               = "${var.compress}"
    max_ttl                = "${var.max_ttl}"
    default_ttl            = "${var.default_ttl}"
    min_ttl                = "${var.min_ttl}"
    target_origin_id       = "${var.origin_id}"
    viewer_protocol_policy = "${var.viewer_protocol_policy}"

    forwarded_values {
      headers      = ["${var.forward_headers}"]
      query_string = "${var.forward_query_string}"

      cookies {
        forward           = "${var.forward_cookies}"
        whitelisted_names = ["${var.forward_cookies_whitelisted_names}"]
      }
    }
  }

  # logging config
  #logging_config = {
  #  bucket          = "${var.log_s3_bucket}"
  #  prefix          = "${var.log_s3_prefix}"
  #  include_cookies = "${var.log_include_cookies}"
  #}

  # origin config
  origin {
    domain_name = "${var.origin_domain_name}"
    origin_id   = "${var.origin_id}"
    origin_path = "${var.origin_path}"

    custom_origin_config {
      http_port                = "${var.origin_http_port}"
      https_port               = "${var.origin_https_port}"
      origin_protocol_policy   = "${var.origin_protocol_policy}"
      origin_ssl_protocols     = "${var.origin_ssl_protocols}"
      origin_keepalive_timeout = "${var.origin_keepalive_timeout}"
      origin_read_timeout      = "${var.origin_read_timeout}"
    }
  }

  # restrictions
  restrictions {
    geo_restriction {
      restriction_type = "${var.geo_restriction_type}"
      locations        = "${var.geo_restriction_locations}"
    }
  }

  # viewer certificate
  viewer_certificate {
    acm_certificate_arn            = "${var.acm_certificate_arn}"
    ssl_support_method             = "${var.ssl_support_method}"
    minimum_protocol_version       = "${var.minimum_protocol_version}"
    cloudfront_default_certificate = "${var.cloudfront_default_certificate}"
  }

  tags = "${merge(var.default_tags, var.custom_tags)}"
}

resource "null_resource" "invalidate_trigger" {
  depends_on = ["data.terraform_remote_state.s3_bucket"]
  triggers {
    source_code_hash = "${data.terraform_remote_state.s3_bucket.index_trigger}"
  }

  provisioner "local-exec" {
    command = "node scripts/invalidate.js"

    environment {
      ID = "${aws_cloudfront_distribution.cloudfront_distribution.id}"
    }
  }
}
