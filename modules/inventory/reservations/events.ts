export const events = {
  created: "inventory/reservations.created",
  updated: "inventory/reservations.updated",
  submitted: "inventory/reservations.submitted",
  approved: "inventory/reservations.approved",
  rejected: "inventory/reservations.rejected",
  cancelled: "inventory/reservations.cancelled",
  closed: "inventory/reservations.closed",
  riskDetected: "inventory/reservations.risk-detected",
  nextActionRecommended: "inventory/reservations.next-action-recommended",
} as const;
