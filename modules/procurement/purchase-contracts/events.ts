export const events = {
  created: "procurement/purchase-contracts.created",
  updated: "procurement/purchase-contracts.updated",
  submitted: "procurement/purchase-contracts.submitted",
  approved: "procurement/purchase-contracts.approved",
  rejected: "procurement/purchase-contracts.rejected",
  cancelled: "procurement/purchase-contracts.cancelled",
  closed: "procurement/purchase-contracts.closed",
  riskDetected: "procurement/purchase-contracts.risk-detected",
  nextActionRecommended: "procurement/purchase-contracts.next-action-recommended",
} as const;
