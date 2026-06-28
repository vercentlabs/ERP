export const events = {
  created: "finance/consolidation.created",
  updated: "finance/consolidation.updated",
  submitted: "finance/consolidation.submitted",
  approved: "finance/consolidation.approved",
  rejected: "finance/consolidation.rejected",
  cancelled: "finance/consolidation.cancelled",
  closed: "finance/consolidation.closed",
  riskDetected: "finance/consolidation.risk-detected",
  nextActionRecommended: "finance/consolidation.next-action-recommended",
} as const;
