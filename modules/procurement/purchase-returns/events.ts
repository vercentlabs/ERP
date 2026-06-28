export const events = {
  created: "procurement/purchase-returns.created",
  updated: "procurement/purchase-returns.updated",
  submitted: "procurement/purchase-returns.submitted",
  approved: "procurement/purchase-returns.approved",
  rejected: "procurement/purchase-returns.rejected",
  cancelled: "procurement/purchase-returns.cancelled",
  closed: "procurement/purchase-returns.closed",
  riskDetected: "procurement/purchase-returns.risk-detected",
  nextActionRecommended: "procurement/purchase-returns.next-action-recommended",
} as const;
