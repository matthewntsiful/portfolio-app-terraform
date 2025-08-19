#Route53 Module Variables 
variable "domain_name" {
  type        = string
  description = "Domain Name for Route53"
}

variable "cloudfront_distribution_domain" {
  type        = string
  description = "CloudFront Distribution Domain Name"
}

variable "cloudfront_distribution_zone" {
  type        = string
  description = "CloudFront Distribution Zone ID"
}

variable "environment" {
  type        = string
  description = "Environment for Route53"
}

variable "enable_health_check" {
  type        = bool
  description = "Enable Health Check"
  default     = true
}