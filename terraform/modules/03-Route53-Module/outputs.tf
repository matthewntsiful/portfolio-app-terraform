# =============================================================================
# ROUTE53 MODULE OUTPUTS
# =============================================================================

output "hosted_zone_id" {
  description = "The ID of the hosted zone"
  value       = data.aws_route53_zone.main.zone_id
}

output "hosted_zone_arn" {
  description = "The ARN of the hosted zone"
  value       = data.aws_route53_zone.main.arn
}

output "name_servers" {
  description = "The name servers of the hosted zone"
  value       = data.aws_route53_zone.main.name_servers
}

output "health_check_id" {
  description = "ID of the health check"
  value       = var.enable_health_check ? aws_route53_health_check.main[0].id : null
}