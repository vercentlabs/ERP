export const events = {
  created: "compliance/data-retention.created",
  updated: "compliance/data-retention.updated",
  submitted: "compliance/data-retention.submitted",
  approved: "compliance/data-retention.approved",
  rejected: "compliance/data-retention.rejected",
  cancelled: "compliance/data-retention.cancelled",
  closed: "compliance/data-retention.closed",
  riskDetected: "compliance/data-retention.risk-detected",
  nextActionRecommended: "compliance/data-retention.next-action-recommended",
} as const;
