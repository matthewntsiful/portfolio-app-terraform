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

# VPC Configuration
vpc_id = "vpc-0e1753c29d98965f5"  # Default VPC for the resume website

# AWS Region and Cost Settings
aws_region             = "us-east-1"
cloudfront_price_class = "PriceClass_100" # Use only North America and Europe edge locations

# Common Tags
tags = {
  Project     = "Resume App"
  Environment = "Production"
  Owner       = "Matthew Ntsiful"
  Purpose     = "Resume Website"
  Managed     = "Terraform"
  Created     = "2025-08-18"
  Updated     = "2025-08-21"
}