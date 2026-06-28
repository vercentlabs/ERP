export const events = {
  created: "procurement/supplier-scorecards.created",
  updated: "procurement/supplier-scorecards.updated",
  submitted: "procurement/supplier-scorecards.submitted",
  approved: "procurement/supplier-scorecards.approved",
  rejected: "procurement/supplier-scorecards.rejected",
  cancelled: "procurement/supplier-scorecards.cancelled",
  closed: "procurement/supplier-scorecards.closed",
  riskDetected: "procurement/supplier-scorecards.risk-detected",
  nextActionRecommended: "procurement/supplier-scorecards.next-action-recommended",
} as const;
