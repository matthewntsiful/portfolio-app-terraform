# =============================================================================
# COMMON VARIABLES FOR ALL MODULES
# =============================================================================

# Domain Configuration
variable "domain_name" {
  description = "The domain name for the website"
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