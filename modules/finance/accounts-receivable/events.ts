export const events = {
  created: "finance/accounts-receivable.created",
  updated: "finance/accounts-receivable.updated",
  submitted: "finance/accounts-receivable.submitted",
  approved: "finance/accounts-receivable.approved",
  rejected: "finance/accounts-receivable.rejected",
  cancelled: "finance/accounts-receivable.cancelled",
  closed: "finance/accounts-receivable.closed",
  riskDetected: "finance/accounts-receivable.risk-detected",
  nextActionRecommended: "finance/accounts-receivable.next-action-recommended",
} as const;
