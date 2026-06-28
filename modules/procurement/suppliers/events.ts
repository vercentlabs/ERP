export const events = {
  created: "procurement/suppliers.created",
  updated: "procurement/suppliers.updated",
  submitted: "procurement/suppliers.submitted",
  approved: "procurement/suppliers.approved",
  rejected: "procurement/suppliers.rejected",
  cancelled: "procurement/suppliers.cancelled",
  closed: "procurement/suppliers.closed",
  riskDetected: "procurement/suppliers.risk-detected",
  nextActionRecommended: "procurement/suppliers.next-action-recommended",
} as const;
