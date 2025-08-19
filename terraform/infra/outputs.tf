# =============================================================================
# ROOT MODULE OUTPUTS
# =============================================================================

output "website_url" {
  description = "URL of the website"
  value       = "https://${var.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = module.cloudfront.distribution_id
}

output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = module.s3.bucket_name
}

output "route53_hosted_zone_id" {
  description = "Route53 hosted zone ID"
  value       = module.route53.hosted_zone_id
}

output "name_servers" {
  description = "Name servers for the domain"
  value       = module.route53.name_servers
}