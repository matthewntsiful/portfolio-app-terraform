# =============================================================================
# ROOT MODULE MAIN.TF - MODULE INTEGRATION
# =============================================================================

# S3 Module - Create first
module "s3" {
  source = "../modules/00-S3-Module"

  domain_name       = var.domain_name
  lifecycle_enabled = var.lifecycle_enabled
}

# Route53 Module - Create second (needed for certificate validation)
module "route53" {
  source                         = "../modules/03-Route53-Module"
  domain_name                    = var.domain_name
  cloudfront_distribution_domain = module.cloudfront.distribution_domain_name
  cloudfront_distribution_zone   = module.cloudfront.distribution_hosted_zone_id
  enable_health_check            = var.enable_health_check
}

# WAF Module - Create third
module "waf" {
  source = "../modules/02-Waf-Module"

  environment = var.environment
}

# CloudFront Module - Create after Route53 (needs hosted zone for cert validation)
module "cloudfront" {
  source = "../modules/01-Cloudfront-Module"
  providers = {
    aws.us_east_1 = aws.us_east_1

  }
  domain_name               = var.domain_name
  s3_bucket_regional_domain = module.s3.bucket_regional_domain_name
  origin_access_control_id  = module.s3.origin_access_control_id
  waf_web_acl_arn           = module.waf.waf_acl_arn
  enable_logging            = var.enable_logging
  cloudfront_price_class    = var.cloudfront_price_class
  hosted_zone_id            = module.route53.hosted_zone_id
}