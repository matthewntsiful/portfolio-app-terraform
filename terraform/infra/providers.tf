# =============================================================================
# PROVIDERS.TF - AWS PROVIDER CONFIGURATION
# =============================================================================

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Default AWS Provider
provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = merge({
      Project     = "Resume App"
      Environment = var.environment
      Owner       = "Matthew Ntsiful"
      Managed     = "Terraform"
      CreatedDate = formatdate("YYYY-MM-DD", timestamp())
    }, var.additional_tags)
  }
}

# US East 1 Provider - Required for ACM certificates used with CloudFront
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
  
  default_tags {
    tags = merge({
      Project     = "Resume App"
      Environment = var.environment
      Owner       = "Matthew Ntsiful"
      Managed     = "Terraform"
      CreatedDate = formatdate("YYYY-MM-DD", timestamp())
    }, var.additional_tags)
  }
}