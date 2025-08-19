module "s3" {
  source                     = "../modules/00-S3-Module"
  environment                = var.environment
  domain_name                = var.domain_name
  lifecycle_enabled          = var.lifecycle_enabled

}

module "cloudfront" {
  source                    = "../modules/01-CloudFront-Module"
  domain_name               = var.domain_name
  s3_bucket_regional_domain = module.s3.webapp_bucket_regional_domain
  waf                       = module.waf.web_acl_arn
  price_class               = var.price_class
  enable_logging            = var.enable_logging
  origin_access_control_id  = module.s3.origin_access_control_id

  providers = {
    aws = aws.us_east_1
  }

  depends_on = [module.waf, module.s3]
}

module "waf" {
  source      = "../modules/02-Waf-Module"
  environment = var.environment

}

module "route53" {
  source                         = "../modules/03-Route53-Module"
  environment                    = var.environment
  domain_name                    = var.domain_name
  cloudfront_distribution_domain = module.cloudfront.distribution_domain
  cloudfront_distribution_zone   = module.cloudfront.distribution_zone
  enable_health_check            = var.enable_health_check

  depends_on = [module.cloudfront]
}