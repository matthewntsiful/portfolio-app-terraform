# =============================================================================
# CLOUDFRONT MODULE - PROVIDERS.TF
# =============================================================================

terraform {
  required_providers {
    aws = {
      source                = "hashicorp/aws"
      version               = "~> 6.7"
      configuration_aliases = [aws.us_east_1]
    }
  }
}

# Resources in this module should use the provider like this:
# resource "aws_acm_certificate" "main" {
#   provider = aws.us_east_1
#   # ... rest of configuration
# }
#
# resource "aws_acm_certificate_validation" "main" {
#   provider = aws.us_east_1  
#   # ... rest of configuration
# }