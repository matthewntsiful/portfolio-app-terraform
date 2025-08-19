locals {
  name_prefix   = "resume-webapp"
  suffix        = "route53"
  date          = "180825"
  resource_name = format("%s-%s-%s", local.name_prefix, local.suffix, local.date)

  common_tags = {
    "Project"     = "Resume App"
    "Environment" = "Production"
    "Owner"       = "Matthew Ntsiful"
    "Purpose"     = "Resume App Route53"
    "Managed"     = "Terraform"
    "Created"     = "2025-08-18"
    "Updated"     = "2025-08-18"
  }
}

#Hosted Zone
resource "aws_route53_zone" "main" {
  name = var.domain_name

  tags = merge(local.common_tags,
  { Name = format("%s-%s-hosted-zone", local.name_prefix, local.suffix) })


}

#A Record for Apex Domain
resource "aws_route53_record" "apex" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = var.cloudfront_distribution_domain
    zone_id                = var.cloudfront_distribution_zone
    evaluate_target_health = false
  }

}

#A Record for www Subdomain
resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = var.cloudfront_distribution_domain
    zone_id                = var.cloudfront_distribution_zone
    evaluate_target_health = false
  }

}

#AAAA Records for Ipv6 Support
resource "aws_route53_record" "ipv6" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "AAAA"

  alias {
    name                   = var.cloudfront_distribution_domain
    zone_id                = var.cloudfront_distribution_zone
    evaluate_target_health = false
  }

}

resource "aws_route53_record" "www_ipv6" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "AAAA"

  alias {
    name                   = var.cloudfront_distribution_domain
    zone_id                = var.cloudfront_distribution_zone
    evaluate_target_health = false
  }

}

#Health Check for Website Monitoring
resource "aws_route53_health_check" "main" {
  count             = var.enable_health_check ? 1 : 0
  fqdn              = var.domain_name
  port              = 443
  type              = "HTTPS"
  resource_path     = "/"
  failure_threshold = 3
  request_interval  = 30
  # cloudwatch_logs_region = "us-east-1"
  # cloudwatch_alarm_region = var.region
  insufficient_data_health_status = "Failure"
  tags = merge(local.common_tags,
  { Name = format("%s-%s-health-check", local.name_prefix, local.suffix) })

}

#CloudWatch Alarm For Health Checks
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
  alarm_description   = "This metrics MonitorsHealth Check Status"
  alarm_actions       = [aws_sns_topic.alert[0].arn]

  dimensions = {
    HealthCheckId = aws_route53_health_check.main[0].id
  }
}


#SNS topic for Health check Alerts
resource "aws_sns_topic" "alert" {

  count = var.enable_health_check ? 1 : 0
  name  = "${var.domain_name}-health-alert"
}