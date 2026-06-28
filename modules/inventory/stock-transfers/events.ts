export const events = {
  created: "inventory/stock-transfers.created",
  updated: "inventory/stock-transfers.updated",
  submitted: "inventory/stock-transfers.submitted",
  approved: "inventory/stock-transfers.approved",
  rejected: "inventory/stock-transfers.rejected",
  cancelled: "inventory/stock-transfers.cancelled",
  closed: "inventory/stock-transfers.closed",
  riskDetected: "inventory/stock-transfers.risk-detected",
  nextActionRecommended: "inventory/stock-transfers.next-action-recommended",
} as const;
