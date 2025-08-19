#Outputs for CloudFront Module
output "distribution_id" {
  description = "The distribution ID"
  value       = aws_cloudfront_distribution.main.id
}

output "distribution_domain_name" {
  description = "The distribution domain name"
  value       = aws_cloudfront_distribution.main.domain_name
}

output "distribution_arn" {
  description = "The distribution ARN"
  value       = aws_cloudfront_distribution.main.arn
}

output "distribution_hosted_zone_id" {
  description = "The distribution hosted zone ID"
  value       = aws_cloudfront_distribution.main.hosted_zone_id
}

output "certificate_arn" {
  description = "The certificate ARN"
  value       = aws_acm_certificate.main.arn
}

output "certificate_validation_options" {
  description = "The certificate validation DNS records"
  value       = aws_acm_certificate.main.validation_options
}

