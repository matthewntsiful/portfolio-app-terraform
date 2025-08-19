# =============================================================================
# COMMON VARIABLES FOR ALL MODULES
# =============================================================================

# Domain Configuration
variable "domain_name" {
  description = "The domain name for the website"
  type        = string
}

variable "environment" {
  description = "The environment for the website"
  type        = string
}

# =============================================================================
# S3 MODULE VARIABLES
# =============================================================================

variable "lifecycle_enabled" {
  description = "Enable S3 bucket lifecycle configuration"
  type        = bool
  default     = true
}

# =============================================================================
# CLOUDFRONT MODULE VARIABLES
# =============================================================================

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

# =============================================================================
# ROUTE53 MODULE VARIABLES  
# =============================================================================

variable "cloudfront_distribution_domain" {
  description = "Domain name of the CloudFront distribution"
  type        = string
}

variable "cloudfront_distribution_zone" {
  description = "Hosted zone ID of the CloudFront distribution"
  type        = string
}

variable "enable_health_check" {
  description = "Enable Route53 health checks"
  type        = bool
  default     = false
}