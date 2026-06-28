export const events = {
  created: "finance/cash-flow.created",
  updated: "finance/cash-flow.updated",
  submitted: "finance/cash-flow.submitted",
  approved: "finance/cash-flow.approved",
  rejected: "finance/cash-flow.rejected",
  cancelled: "finance/cash-flow.cancelled",
  closed: "finance/cash-flow.closed",
  riskDetected: "finance/cash-flow.risk-detected",
  nextActionRecommended: "finance/cash-flow.next-action-recommended",
} as const;
