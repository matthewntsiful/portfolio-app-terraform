#Variables for Infrastructure

#Variables for S3
variable "environment" {
  description = "Environment for the S3 Bucket"
  type        = string
  default     = "production"
  validation {
    condition     = contains(["development", "staging", "production"], var.environment)
    error_message = "Environment must be development, staging or production"
  }
}

variable "domain_name" {
  description = "Domain Name for the resume website"
  type        = string

  validation {
    condition     = can(regex("^([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\\.){1,}[a-zA-Z]{2,}$", var.domain_name))
    error_message = "Domain name must be a valid domain name"
  }
}

variable "enable_logging" {
  description = "Enable cloudFront access logging"
  type        = bool
  default     = true

}

variable "price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100"
  validation {
    condition     = contains(["PriceClass_All", "PriceClass_200", "PriceClass_100"], var.price_class)
    error_message = "Price class must be PriceClass_All, PriceClass_200, PriceClass_100."
  }

}
variable "lifecycle_enabled" {
  description = "Enable lifecycle management"
  type        = bool
  default     = true
}

variable "enable_health_check" {
  description = "Enable health check"
  type        = bool
  default     = true
}

variable "origin_access_control_id" {
  description = "Origin Access Control ID"
  type        = string
}