export const events = {
  created: "compliance/consent-management.created",
  updated: "compliance/consent-management.updated",
  submitted: "compliance/consent-management.submitted",
  approved: "compliance/consent-management.approved",
  rejected: "compliance/consent-management.rejected",
  cancelled: "compliance/consent-management.cancelled",
  closed: "compliance/consent-management.closed",
  riskDetected: "compliance/consent-management.risk-detected",
  nextActionRecommended: "compliance/consent-management.next-action-recommended",
} as const;
