#Variables for S3 Module

variable "environment" {
  description = "Environment for the S3 Bucket"
  type        = string
}

variable "domain_name" {
  description = "Domain Name for the S3 Bucket"
  type        = string
}

variable "enable_versioning" {
  description = "Enable Versioning for the S3 Bucket"
  type        = bool
  default     = true
}

variable "lifecycle_enabled" {
  description = "Enable lifecycle management"
  type        = bool
  default     = true
}


output "origin_access_control_id" {
  description = "Origin Access Control ID"
  value       = aws_cloudfront_origin_access_control.main.id
}
