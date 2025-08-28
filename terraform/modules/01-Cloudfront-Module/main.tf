# =============================================================================
# CLOUDFRONT MODULE - RESOURCE DEFINITION
# =============================================================================

locals {
  name_prefix   = "resume-webapp"
  suffix        = "distribution"
  date          = "180825"
  resource_name = format("%s-%s-%s", local.name_prefix, local.suffix, local.date)

  common_tags = {
    "Project"     = "Resume App"
    "Environment" = "Production"
    "Owner"       = "Matthew Ntsiful"
    "Purpose"     = "Resume App CloudFront Distribution"
    "Managed"     = "Terraform"
    "Created"     = "2025-08-18"
    "Updated"     = "2025-08-18"
  }
}

# SSL Certificate - MUST be in us-east-1 for CloudFront
resource "aws_acm_certificate" "main" {
  # Force certificate to be created in us-east-1
  provider = aws.us_east_1

  domain_name               = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = merge(local.common_tags, {
    Name = format("%s-certificate", local.name_prefix)
  })
}

# Certificate validation - wait for DNS validation to complete
resource "aws_acm_certificate_validation" "main" {
  provider = aws.us_east_1

  certificate_arn         = aws_acm_certificate.main.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]

  timeouts {
    create = "15m"
  }
}

# DNS validation records
resource "aws_route53_record" "cert_validation" {
  provider = aws
  for_each = {

    for dvo in aws_acm_certificate.main.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = var.hosted_zone_id
}

# S3 Bucket for Logging (create first if needed)
resource "aws_s3_bucket" "logs" {
  count  = var.enable_logging ? 1 : 0
  bucket = format("%s-logs-%s", local.name_prefix, local.date)

  tags = merge(local.common_tags, {
    Name = format("%s-logs", local.name_prefix)
  })
}

resource "aws_s3_bucket_lifecycle_configuration" "logs" {
  count  = var.enable_logging ? 1 : 0
  bucket = aws_s3_bucket.logs[0].id

  rule {
    id     = "log-expiration"
    status = "Enabled"

    # Required filter
    filter {
      prefix = ""
    }

    expiration {
      days = 90
    }

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }

    transition {
      days          = 60
      storage_class = "GLACIER"
    }
  }
}

# CloudFront Distribution - FIXED: Now depends on certificate validation
resource "aws_cloudfront_distribution" "main" {
  # Explicitly depend on certificate validation
  depends_on = [aws_acm_certificate_validation.main]

  origin {
    domain_name              = var.s3_bucket_regional_domain
    origin_id                = "S3-${var.domain_name}"
    origin_access_control_id = var.origin_access_control_id
    origin_path             = "/portfolio"
  }

  # Logging configuration - properly structured
  dynamic "logging_config" {
    for_each = var.enable_logging ? [1] : []
    content {
      bucket          = aws_s3_bucket.logs[0].bucket_domain_name
      include_cookies = false
      prefix          = "cloudfront-logs/"
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  web_acl_id          = var.waf_web_acl_arn
  aliases             = [var.domain_name, "www.${var.domain_name}"]

  # Optimized Cache Behaviour for Resume Website
  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${var.domain_name}"
    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      headers      = ["Origin", "Access-Control-Request-Headers", "Access-Control-Request-Method"]
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 604800   # 1 week for CSS/JS
    max_ttl     = 31536000 # 1 year
  }

  price_class = var.cloudfront_price_class

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    # Use the validated certificate
    acm_certificate_arn      = aws_acm_certificate_validation.main.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  # FIXED: Added leading forward slashes to response_page_path
  custom_error_response {
    error_code         = 404
    response_code      = 404
    response_page_path = "/portfolio/404.html"  # ✅ Added leading slash
  }

  custom_error_response {
    error_code         = 403
    response_code      = 403
    response_page_path = "/portfolio/403.html"  # ✅ Added leading slash
  }

  tags = merge(local.common_tags, {
    Name = format("%s-%s", local.name_prefix, local.suffix)
  })
}
