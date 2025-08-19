#Variables for CloudFront Module

variable "domain_name" {
  description = "Domain Name for the resume website"
  type        = string
}

variable "s3_bucket_regional_domain" {
  description = "S3 Bucket Regional Domain Name"
  type        = string
}

variable "waf" {
  description = "WAF Web ACL ARN"
  type        = string
}

variable "price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100"
}

variable "enable_logging" {
  description = "Enable cloudFront access logging"
  type        = bool
  default     = true
}

variable "origin_access_control_id" {
  description = "Origin Access Control ID"
  type        = string
  default     = null
}