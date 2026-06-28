export const events = {
  created: "inventory/valuation.created",
  updated: "inventory/valuation.updated",
  submitted: "inventory/valuation.submitted",
  approved: "inventory/valuation.approved",
  rejected: "inventory/valuation.rejected",
  cancelled: "inventory/valuation.cancelled",
  closed: "inventory/valuation.closed",
  riskDetected: "inventory/valuation.risk-detected",
  nextActionRecommended: "inventory/valuation.next-action-recommended",
} as const;
