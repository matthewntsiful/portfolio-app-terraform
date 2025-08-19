#Outputs for WAF Module
output "waf_acl_id" {
  description = "ID of the WAF ACL"
  value       = module.wafv2_acl.waf_acl_id
}

output "waf_acl_arn" {
  description = "ARN of the WAF ACL"
  value       = module.wafv2_acl.waf_acl_arn
}

output "web_acl_capacity" {
  description = "Capacity units consumed by the Web ACL"
  value       = aws_wafv2_web_acl.main.capacity
}
