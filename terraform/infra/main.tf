# =============================================================================
# ROOT MODULE MAIN.TF - MODULE INTEGRATION
# =============================================================================


# S3 Module
module "s3" {
  source = "../modules/00-S3-Module"

  domain_name       = var.domain_name
  lifecycle_enabled = var.lifecycle_enabled
}

# WAF Module
module "waf" {
  source = "../modules/02-Waf-Module"

  environment = var.environment
}

# CloudFront Module
module "cloudfront" {
  source = "../modules/01-Cloudfront-Module"

  domain_name               = var.domain_name
  s3_bucket_regional_domain = module.s3.bucket_regional_domain_name
  origin_access_control_id  = module.s3.origin_access_control_id
  waf_web_acl_arn           = module.waf.waf_acl_arn
  enable_logging            = var.enable_logging

}

# Route53 Module
module "route53" {
  source = "../modules/03-Route53-Module"

  domain_name                    = var.domain_name
  cloudfront_distribution_domain = module.cloudfront.distribution_domain_name
  cloudfront_distribution_zone   = module.cloudfront.distribution_hosted_zone_id
  enable_health_check            = var.enable_health_check
}