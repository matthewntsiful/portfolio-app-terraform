# =============================================================================
# CLOUDFRONT SECURITY GROUP MODULE - RESOURCE DEFINITION
# =============================================================================

# Security Group for CloudFront
resource "aws_security_group" "cloudfront_sg" {
  name        = "${var.name_prefix}-cloudfront-sg"
  description = "Security group for CloudFront distribution"
  vpc_id      = var.vpc_id
  
  # Allow HTTPS (port 443) from anywhere
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow HTTPS traffic from anywhere"
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic"
  }

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-cloudfront-sg"
  })
}
