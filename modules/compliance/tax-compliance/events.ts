export const events = {
  created: "compliance/tax-compliance.created",
  updated: "compliance/tax-compliance.updated",
  submitted: "compliance/tax-compliance.submitted",
  approved: "compliance/tax-compliance.approved",
  rejected: "compliance/tax-compliance.rejected",
  cancelled: "compliance/tax-compliance.cancelled",
  closed: "compliance/tax-compliance.closed",
  riskDetected: "compliance/tax-compliance.risk-detected",
  nextActionRecommended: "compliance/tax-compliance.next-action-recommended",
} as const;
