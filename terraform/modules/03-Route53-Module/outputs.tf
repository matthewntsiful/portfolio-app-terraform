#Outputs for Route53 Module

output "hosted_zone_id" {
  description = "The hosted zone ID"
  value       = aws_route53_zone.main.zone_id
}

output "hosted_zone_name" {
  description = "The hosted zone name"
  value       = aws_route53_zone.main.name
}

output "name_servers" {
  description = "The name servers for the hosted zone"
  value       = aws_route53_zone.main.name_servers
}

output "hosted_zone_arn" {
  description = "The ARN of the hosted zone"
  value       = aws_route53_zone.main.arn
}

