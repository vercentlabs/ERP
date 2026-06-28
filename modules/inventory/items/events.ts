export const events = {
  created: "inventory/items.created",
  updated: "inventory/items.updated",
  submitted: "inventory/items.submitted",
  approved: "inventory/items.approved",
  rejected: "inventory/items.rejected",
  cancelled: "inventory/items.cancelled",
  closed: "inventory/items.closed",
  riskDetected: "inventory/items.risk-detected",
  nextActionRecommended: "inventory/items.next-action-recommended",
} as const;
