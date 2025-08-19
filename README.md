# Resume-Webapp-S3-ClouFront-Route53-Waf

infra/
├── main.tf                    # Root module integration
├── variables.tf               # Only user-facing variables
├── outputs.tf                 # Root outputs
├── terraform.tfvars          # Your configuration values
└── modules/
    ├── 00-S3-Module/
    │   ├── main.tf
    │   ├── variables.tf       # Only S3-specific variables
    │   └── outputs.tf
    ├── 01-CloudFront-Module/
    │   ├── main.tf
    │   ├── variables.tf       # Only CloudFront-specific variables
    │   └── outputs.tf
    ├── 02-Waf-Module/
    │   ├── main.tf
    │   └── outputs.tf
    └── 03-Route53-Module/
        ├── main.tf
        ├── variables.tf       # Only Route53-specific variables
        └── outputs.tf

        /
├── index.html
├── error.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── assets/
│   ├── icons/
│   └── images/
└── README.md