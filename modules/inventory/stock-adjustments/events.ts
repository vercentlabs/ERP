export const events = {
  created: "inventory/stock-adjustments.created",
  updated: "inventory/stock-adjustments.updated",
  submitted: "inventory/stock-adjustments.submitted",
  approved: "inventory/stock-adjustments.approved",
  rejected: "inventory/stock-adjustments.rejected",
  cancelled: "inventory/stock-adjustments.cancelled",
  closed: "inventory/stock-adjustments.closed",
  riskDetected: "inventory/stock-adjustments.risk-detected",
  nextActionRecommended: "inventory/stock-adjustments.next-action-recommended",
} as const;
