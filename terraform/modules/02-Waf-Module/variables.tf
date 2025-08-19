# =============================================================================
# WAF MODULE VARIABLES
# =============================================================================

variable "environment" {
  description = "Environment for the WAF"
  type        = string
}

variable "rate_limit" {
  description = "Rate limit for request per 5 minutes period"
  type        = number
  default     = 2000
}

variable "enable_geo_logging" {
  description = "Enable Geo Logging"
  type        = bool
  default     = true
}

variable "blocked_countries" {
  description = "List of blocked countries"
  type        = list(string)
  default     = []
}
