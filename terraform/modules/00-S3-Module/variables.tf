# =============================================================================
# S3 MODULE VARIABLES.TF
# =============================================================================

variable "domain_name" {
  description = "The domain name for the website"
  type        = string
}

variable "lifecycle_enabled" {
  description = "Enable S3 bucket lifecycle configuration"
  type        = bool
  default     = true
}

# variables.tf in S3 module
variable "cloudfront_distribution_arn" {
  description = "ARN of the CloudFront distribution for bucket policy"
  type        = string
  default     = ""
}