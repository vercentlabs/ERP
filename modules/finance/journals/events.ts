export const events = {
  created: "finance/journals.created",
  updated: "finance/journals.updated",
  submitted: "finance/journals.submitted",
  approved: "finance/journals.approved",
  rejected: "finance/journals.rejected",
  cancelled: "finance/journals.cancelled",
  closed: "finance/journals.closed",
  riskDetected: "finance/journals.risk-detected",
  nextActionRecommended: "finance/journals.next-action-recommended",
} as const;
