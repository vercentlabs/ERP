export const events = {
  created: "inventory/serial-batches.created",
  updated: "inventory/serial-batches.updated",
  submitted: "inventory/serial-batches.submitted",
  approved: "inventory/serial-batches.approved",
  rejected: "inventory/serial-batches.rejected",
  cancelled: "inventory/serial-batches.cancelled",
  closed: "inventory/serial-batches.closed",
  riskDetected: "inventory/serial-batches.risk-detected",
  nextActionRecommended: "inventory/serial-batches.next-action-recommended",
} as const;
