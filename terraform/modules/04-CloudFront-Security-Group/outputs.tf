# =============================================================================
# CLOUDFRONT SECURITY GROUP MODULE - OUTPUTS
# =============================================================================

output "cloudfront_sg_id" {
  description = "The ID of the CloudFront security group"
  value       = aws_security_group.cloudfront_sg.id
}
