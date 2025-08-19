#Outputs for S3 Module

output "bucket_name" {
  description = "The bucket name"
  value = aws_s3_bucket.webapp_bucket.id
}

output "bucket_arn" {
  description = "The bucket ARN"
  value = aws_s3_bucket.webapp_bucket.arn
}

output "bucket_policy" {
  description = "The bucket policy"
  value = aws_s3_bucket_policy.webapp_bucket.policy
}

output "bucket_domain_name" {
  description = "The bucket domain name"
  value = aws_s3_bucket.webapp_bucket.bucket_domain_name
}

output "bucket_regional_domain_name" {
  description = "The bucket regional domain name"
  value = aws_s3_bucket.webapp_bucket.bucket_regional_domain_name
}

output "origin_acess_control_id" {
  description = "The origin access control ID"
  value = aws_cloudfront_origin_access_control.main.id
}

output "origin_acess_control_arn" {
  description = "The origin access control ARN"
  value = aws_cloudfront_origin_access_control.main.arn
}