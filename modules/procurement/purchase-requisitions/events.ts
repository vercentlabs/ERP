export const events = {
  created: "procurement/purchase-requisitions.created",
  updated: "procurement/purchase-requisitions.updated",
  submitted: "procurement/purchase-requisitions.submitted",
  approved: "procurement/purchase-requisitions.approved",
  rejected: "procurement/purchase-requisitions.rejected",
  cancelled: "procurement/purchase-requisitions.cancelled",
  closed: "procurement/purchase-requisitions.closed",
  riskDetected: "procurement/purchase-requisitions.risk-detected",
  nextActionRecommended: "procurement/purchase-requisitions.next-action-recommended",
} as const;
