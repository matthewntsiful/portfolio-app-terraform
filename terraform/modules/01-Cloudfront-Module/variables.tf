# =============================================================================
# CLOUDFRONT MODULE VARIABLES.TF
# =============================================================================

variable "domain_name" {
  description = "The domain name for the website"
  type        = string
}

variable "s3_bucket_regional_domain" {
  description = "Regional domain name of the S3 bucket"
  type        = string
}

variable "origin_access_control_id" {
  description = "ID of the Origin Access Control"
  type        = string
}

variable "waf_web_acl_arn" {
  description = "ARN of the WAF Web ACL"
  type        = string
  default     = null
}

variable "enable_logging" {
  description = "Enable CloudFront logging"
  type        = bool
  default     = false
}

variable "cloudfront_price_class" {
  description = "CloudFront distribution price class"
  type        = string
  default     = "PriceClass_100"
}