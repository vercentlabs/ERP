export const events = {
  created: "inventory/warehouses.created",
  updated: "inventory/warehouses.updated",
  submitted: "inventory/warehouses.submitted",
  approved: "inventory/warehouses.approved",
  rejected: "inventory/warehouses.rejected",
  cancelled: "inventory/warehouses.cancelled",
  closed: "inventory/warehouses.closed",
  riskDetected: "inventory/warehouses.risk-detected",
  nextActionRecommended: "inventory/warehouses.next-action-recommended",
} as const;
