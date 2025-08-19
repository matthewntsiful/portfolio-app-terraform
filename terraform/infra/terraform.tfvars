# =============================================================================
# TERRAFORM.TFVARS - MAIN CONFIGURATION VALUES
# =============================================================================

# REQUIRED: Domain Configuration
# Replace with your actual domain name
domain_name = "matthewntsiful.com"

# OPTIONAL: Environment and Feature Toggles
environment         = "production"
lifecycle_enabled   = true  # Enable S3 lifecycle policies for cost optimization
enable_logging      = false # Enable CloudFront access logging (increases costs)
enable_health_check = true  # Enable Route53 health checks for monitoring

# OPTIONAL: AWS Region and Cost Settings
aws_region             = "us-east-1"
cloudfront_price_class = "PriceClass_100" # Use only North America and Europe edge locations

# OPTIONAL: Additional tags
additional_tags = {
  # "CostCenter" = "Engineering"
  # "Team"       = "DevOps"
}