# =============================================================================
# ROOT MODULE OUTPUTS.TF
# =============================================================================

output "website_url" {
  description = "URL of the website"
  value       = "https://${var.domain_name}"
}

output "www_website_url" {
  description = "WWW URL of the website"
  value       = "https://www.${var.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID for cache invalidation"
  value       = module.cloudfront.distribution_id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = module.cloudfront.distribution_domain_name
}

output "s3_bucket_name" {
  description = "S3 bucket name for uploading website files"
  value       = module.s3.bucket_name
}

output "route53_hosted_zone_id" {
  description = "Route53 hosted zone ID"
  value       = module.route53.hosted_zone_id
}

output "route53_name_servers" {
  description = "Name servers for the domain (update these in your domain registrar)"
  value       = module.route53.name_servers
}

output "acm_certificate_arn" {
  description = "ACM certificate ARN"
  value       = module.cloudfront.certificate_arn
}

# Deployment Instructions
output "next_steps" {
  description = "Instructions for completing the setup"
  value       = <<-EOT
    🚀 DEPLOYMENT SUCCESSFUL! Next steps:
    
    1. 📋 UPDATE NAMESERVERS:
       Update your domain registrar with these nameservers:
       ${join(", ", module.route53.name_servers)}
    
    2. ✅ VERIFY SSL CERTIFICATE:
       Check ACM console for certificate validation status
       Add DNS validation records if not auto-validated
    
    3. 📁 UPLOAD WEBSITE FILES:
       Upload your resume website files to S3 bucket: ${module.s3.bucket_name}
       
    4. 🌐 ACCESS YOUR WEBSITE:
       Primary: https://${var.domain_name}
       WWW: https://www.${var.domain_name}
       CloudFront: https://${module.cloudfront.distribution_domain_name}
    
    5. 🔄 CACHE INVALIDATION (when updating files):
       aws cloudfront create-invalidation --distribution-id ${module.cloudfront.distribution_id} --paths "/*"
  EOT
}