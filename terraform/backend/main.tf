locals {
  name_prefix   = "resume-app"
  suffix        = "backend"
  date          = "180825"
  resource_name = format("%s-%s-%s", local.name_prefix, local.suffix, local.date)
  common_tags = {
    "Project"     = "Resume App"
    "Environment" = "Production"
    "Owner"       = "Matthew Ntsiful"
    "Purpose"     = "Terraform Backend"
    "Managed"     = "Terraform"
    "Created"     = "2025-08-18"
    "Updated"     = "2025-08-18"
  }
}

resource "aws_s3_bucket" "resumeapp_bucket" {
  bucket = local.resource_name
  tags = merge(local.common_tags,

  { Name = format("%s-%s", local.name_prefix, local.suffix) })

}

resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.resumeapp_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "server_side_encryption_configuration" {
  bucket = aws_s3_bucket.resumeapp_bucket.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "access_block" {
  bucket                  = aws_s3_bucket.resumeapp_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

output "bucket_name" {
  value = aws_s3_bucket.resumeapp_bucket.id
}

output "bucket_arn" {
  value = aws_s3_bucket.resumeapp_bucket.arn
}


output "bucket_access_block" {
  value = aws_s3_bucket_public_access_block.access_block.block_public_acls
}