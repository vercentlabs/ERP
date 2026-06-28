export const events = {
  created: "inventory/safety-stock.created",
  updated: "inventory/safety-stock.updated",
  submitted: "inventory/safety-stock.submitted",
  approved: "inventory/safety-stock.approved",
  rejected: "inventory/safety-stock.rejected",
  cancelled: "inventory/safety-stock.cancelled",
  closed: "inventory/safety-stock.closed",
  riskDetected: "inventory/safety-stock.risk-detected",
  nextActionRecommended: "inventory/safety-stock.next-action-recommended",
} as const;
