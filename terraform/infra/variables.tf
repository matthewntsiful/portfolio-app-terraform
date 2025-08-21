# =============================================================================
# ROOT MODULE VARIABLES.TF - ONLY USER-FACING VARIABLES
# =============================================================================

variable "domain_name" {
  description = "The domain name for the resume website (e.g., 'example.com')"
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\\.[a-z]{2,}$", var.domain_name))
    error_message = "Domain name must be a valid domain (e.g., 'example.com')."
  }
}

variable "environment" {
  description = "Environment name (e.g., 'production', 'staging', 'development')"
  type        = string
  default     = "production"

  validation {
    condition     = contains(["production", "staging", "development"], var.environment)
    error_message = "Environment must be 'production', 'staging', or 'development'."
  }
}

variable "lifecycle_enabled" {
  description = "Enable S3 bucket lifecycle configuration for cost optimization"
  type        = bool
  default     = true
}

variable "enable_logging" {
  description = "Enable CloudFront access logging (creates additional S3 bucket and costs)"
  type        = bool
  default     = true
}

variable "enable_health_check" {
  description = "Enable Route53 health checks for website monitoring"
  type        = bool
  default     = true
}

variable "aws_region" {
  description = "AWS region for resources (ACM certificate must be in us-east-1 for CloudFront)"
  type        = string
  default     = "us-east-1"
}

variable "cloudfront_price_class" {
  description = "CloudFront distribution price class"
  type        = string
  default     = "PriceClass_100"

  validation {
    condition     = contains(["PriceClass_All", "PriceClass_200", "PriceClass_100"], var.cloudfront_price_class)
    error_message = "Price class must be 'PriceClass_All', 'PriceClass_200', or 'PriceClass_100'."
  }
}

# Optional: Additional tags
variable "additional_tags" {
  description = "Additional tags to apply to all resources"
  type        = map(string)
  default     = {}
}