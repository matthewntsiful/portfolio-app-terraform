# =============================================================================
# S3 MODULE OUTPUTS 
# =============================================================================

output "bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.webapp_bucket.id
}

output "bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.webapp_bucket.arn
}

output "bucket_domain_name" {
  description = "Domain name of the S3 bucket"
  value       = aws_s3_bucket.webapp_bucket.bucket_domain_name
}

output "bucket_regional_domain_name" {
  description = "Regional domain name of the S3 bucket"
  value       = aws_s3_bucket.webapp_bucket.bucket_regional_domain_name
}

output "origin_access_control_id" {
  description = "ID of the CloudFront Origin Access Control"
  value       = aws_cloudfront_origin_access_control.webapp_oac.id
}

output "origin_access_control_arn" {
  description = "ARN of the CloudFront Origin Access Control"
  value       = aws_cloudfront_origin_access_control.webapp_oac.arn
}