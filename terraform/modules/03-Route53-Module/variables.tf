# =============================================================================
# ROUTE53 MODULE VARIABLES.TF
# =============================================================================

variable "domain_name" {
  description = "The domain name for the website"
  type        = string
}

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