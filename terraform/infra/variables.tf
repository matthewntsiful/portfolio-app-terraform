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
  description = "The price class for CloudFront distribution (PriceClass_100, PriceClass_200, PriceClass_All)"
  type        = string
  default     = "PriceClass_100"

  validation {
    condition     = contains(["PriceClass_100", "PriceClass_200", "PriceClass_All"], var.cloudfront_price_class)
    error_message = "CloudFront price class must be one of: PriceClass_100, PriceClass_200, or PriceClass_All."
  }
}

# VPC and Networking
variable "vpc_id" {
  description = "The VPC ID where security groups will be created"
  type        = string
  default     = ""
}

variable "enable_vpc_endpoint" {
  description = "Whether to create a VPC endpoint for S3"
  type        = bool
  default     = false
}

variable "route_table_ids" {
  description = "List of route table IDs for VPC endpoint association"
  type        = list(string)
  default     = []
}

# Tags
variable "tags" {
  description = "A map of tags to add to all resources"
  type        = map(string)
  default     = {}
}

# Optional: Additional tags
variable "additional_tags" {
  description = "Additional tags to apply to all resources"
  type        = map(string)
  default     = {}
}