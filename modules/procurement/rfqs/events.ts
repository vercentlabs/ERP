export const events = {
  created: "procurement/rfqs.created",
  updated: "procurement/rfqs.updated",
  submitted: "procurement/rfqs.submitted",
  approved: "procurement/rfqs.approved",
  rejected: "procurement/rfqs.rejected",
  cancelled: "procurement/rfqs.cancelled",
  closed: "procurement/rfqs.closed",
  riskDetected: "procurement/rfqs.risk-detected",
  nextActionRecommended: "procurement/rfqs.next-action-recommended",
} as const;
