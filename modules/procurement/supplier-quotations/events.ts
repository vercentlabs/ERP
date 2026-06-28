export const events = {
  created: "procurement/supplier-quotations.created",
  updated: "procurement/supplier-quotations.updated",
  submitted: "procurement/supplier-quotations.submitted",
  approved: "procurement/supplier-quotations.approved",
  rejected: "procurement/supplier-quotations.rejected",
  cancelled: "procurement/supplier-quotations.cancelled",
  closed: "procurement/supplier-quotations.closed",
  riskDetected: "procurement/supplier-quotations.risk-detected",
  nextActionRecommended: "procurement/supplier-quotations.next-action-recommended",
} as const;
