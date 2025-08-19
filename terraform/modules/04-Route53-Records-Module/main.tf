# =============================================================================
# ROUTE53 RECORDS MODULE - SEPARATE FROM HOSTED ZONE
# =============================================================================

locals {
  name_prefix = "resume-webapp"
  suffix      = "route53-records"
  date        = "180825"

  common_tags = {
    "Project"     = "Resume App"
    "Environment" = "Production"
    "Owner"       = "Matthew Ntsiful"
    "Purpose"     = "Resume App Route53 Records"
    "Managed"     = "Terraform"
    "Created"     = "2025-08-18"
    "Updated"     = "2025-08-18"
  }
}

# A Record for Apex Domain
resource "aws_route53_record" "apex" {
  zone_id = var.hosted_zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = var.cloudfront_distribution_domain
    zone_id                = var.cloudfront_distribution_zone
    evaluate_target_health = false
  }
}

# A Record for www Subdomain
resource "aws_route53_record" "www" {
  zone_id = var.hosted_zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = var.cloudfront_distribution_domain
    zone_id                = var.cloudfront_distribution_zone
    evaluate_target_health = false
  }
}

# AAAA Records for IPv6 Support
resource "aws_route53_record" "ipv6" {
  zone_id = var.hosted_zone_id
  name    = var.domain_name
  type    = "AAAA"

  alias {
    name                   = var.cloudfront_distribution_domain
    zone_id                = var.cloudfront_distribution_zone
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_ipv6" {
  zone_id = var.hosted_zone_id
  name    = "www.${var.domain_name}"
  type    = "AAAA"

  alias {
    name                   = var.cloudfront_distribution_domain
    zone_id                = var.cloudfront_distribution_zone
    evaluate_target_health = false
  }
}

# Health Check for Website Monitoring
resource "aws_route53_health_check" "main" {
  count                           = var.enable_health_check ? 1 : 0
  fqdn                            = var.domain_name
  port                            = 443
  type                            = "HTTPS"
  resource_path                   = "/"
  failure_threshold               = 3
  request_interval                = 30
  insufficient_data_health_status = "LastKnownStatus"

  tags = merge(local.common_tags, {
    Name = format("%s-health-check", local.name_prefix)
  })
}

# CloudWatch Alarm For Health Checks
resource "aws_cloudwatch_metric_alarm" "health_check" {
  count               = var.enable_health_check ? 1 : 0
  alarm_name          = "${var.domain_name}-health-check-alarm"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = 2
  metric_name         = "HealthCheckStatus"
  namespace           = "AWS/Route53"
  period              = 60
  statistic           = "Minimum"
  threshold           = 1
  alarm_description   = "This metric monitors health check status"
  alarm_actions       = [aws_sns_topic.alert[0].arn]

  dimensions = {
    HealthCheckId = aws_route53_health_check.main[0].id
  }

  tags = merge(local.common_tags, {
    Name = format("%s-health-alarm", local.name_prefix)
  })
}

# SNS topic for Health check Alerts
resource "aws_sns_topic" "alert" {
  count = var.enable_health_check ? 1 : 0
  name  = format("%s-health-alert", local.name_prefix)

  tags = merge(local.common_tags, {
    Name = format("%s-health-alerts", local.name_prefix)
  })
}

# Variables for this module
variable "domain_name" {
  description = "The domain name for the website"
  type        = string
}

variable "hosted_zone_id" {
  description = "Route53 hosted zone ID"
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

# Outputs for this module
output "health_check_id" {
  description = "ID of the health check"
  value       = var.enable_health_check ? aws_route53_health_check.main[0].id : null
}