export const events = {
  created: "inventory/replenishment.created",
  updated: "inventory/replenishment.updated",
  submitted: "inventory/replenishment.submitted",
  approved: "inventory/replenishment.approved",
  rejected: "inventory/replenishment.rejected",
  cancelled: "inventory/replenishment.cancelled",
  closed: "inventory/replenishment.closed",
  riskDetected: "inventory/replenishment.risk-detected",
  nextActionRecommended: "inventory/replenishment.next-action-recommended",
} as const;
