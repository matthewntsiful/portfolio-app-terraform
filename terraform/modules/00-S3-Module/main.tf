# =============================================================================
# S3 MODULE - RESOURCE DEFINITION
# =============================================================================

locals {
  name_prefix   = "resume-webapp"
  suffix        = "storage"
  date          = "180825"
  resource_name = format("%s-%s-%s", local.name_prefix, local.suffix, local.date)

  common_tags = {
    "Project"     = "Resume App"
    "Environment" = "Production"
    "Owner"       = "Matthew Ntsiful"
    "Purpose"     = "Resume App Storage"
    "Managed"     = "Terraform"
    "Created"     = "2025-08-18"
    "Updated"     = "2025-08-18"
  }
}

# Origin Access Control for CloudFront
resource "aws_cloudfront_origin_access_control" "webapp_oac" {
  name                              = "${var.domain_name}-oac"
  description                       = "OAC for ${var.domain_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# S3 bucket for website content
resource "aws_s3_bucket" "webapp_bucket" {
  bucket = var.domain_name
  tags = merge(local.common_tags, {
    Name = format("%s-%s", local.name_prefix, local.suffix)
  })
}

# Block all public access - security first
resource "aws_s3_bucket_public_access_block" "webapp_bucket" {
  bucket = aws_s3_bucket.webapp_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Versioning for rollback capability
resource "aws_s3_bucket_versioning" "webapp_bucket" {
  bucket = aws_s3_bucket.webapp_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "webapp_bucket" {
  bucket = aws_s3_bucket.webapp_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Bucket policy allowing CloudFront access
resource "aws_s3_bucket_policy" "webapp_bucket" {
  bucket = aws_s3_bucket.webapp_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipal"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.webapp_bucket.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = "arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/*"
          }
        }
      }
    ]
  })
}

data "aws_caller_identity" "current" {}

# Lifecycle configuration for cost optimization - FIXED WITH FILTER
resource "aws_s3_bucket_lifecycle_configuration" "webapp_bucket" {
  count  = var.lifecycle_enabled ? 1 : 0
  bucket = aws_s3_bucket.webapp_bucket.id

  rule {
    id     = "website_lifecycle"
    status = "Enabled"

    # Required filter - apply to all objects
    filter {
      prefix = ""
    }

    abort_incomplete_multipart_upload {
      days_after_initiation = 1
    }

    noncurrent_version_expiration {
      noncurrent_days = 30
    }

    noncurrent_version_transition {
      noncurrent_days = 7
      storage_class   = "STANDARD_IA"
    }
  }
}

# CORS Configuration for S3 Modern Web Practices
resource "aws_s3_bucket_cors_configuration" "webapp_bucket" {
  bucket = aws_s3_bucket.webapp_bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["https://${var.domain_name}", "https://www.${var.domain_name}"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}