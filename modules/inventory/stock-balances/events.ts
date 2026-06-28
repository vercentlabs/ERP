export const events = {
  created: "inventory/stock-balances.created",
  updated: "inventory/stock-balances.updated",
  submitted: "inventory/stock-balances.submitted",
  approved: "inventory/stock-balances.approved",
  rejected: "inventory/stock-balances.rejected",
  cancelled: "inventory/stock-balances.cancelled",
  closed: "inventory/stock-balances.closed",
  riskDetected: "inventory/stock-balances.risk-detected",
  nextActionRecommended: "inventory/stock-balances.next-action-recommended",
} as const;
