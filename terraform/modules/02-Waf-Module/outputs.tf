# =============================================================================
# WAF MODULE OUTPUTS 
# =============================================================================

output "waf_acl_id" {
  description = "ID of the WAF ACL"
  value       = aws_wafv2_web_acl.main.id
}

output "waf_acl_arn" {
  description = "ARN of the WAF ACL"
  value       = aws_wafv2_web_acl.main.arn
}

output "waf_acl_name" {
  description = "Name of the WAF ACL"
  value       = aws_wafv2_web_acl.main.name
}