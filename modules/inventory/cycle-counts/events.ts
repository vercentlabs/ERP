export const events = {
  created: "inventory/cycle-counts.created",
  updated: "inventory/cycle-counts.updated",
  submitted: "inventory/cycle-counts.submitted",
  approved: "inventory/cycle-counts.approved",
  rejected: "inventory/cycle-counts.rejected",
  cancelled: "inventory/cycle-counts.cancelled",
  closed: "inventory/cycle-counts.closed",
  riskDetected: "inventory/cycle-counts.risk-detected",
  nextActionRecommended: "inventory/cycle-counts.next-action-recommended",
} as const;
