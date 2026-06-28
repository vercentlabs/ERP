export const events = {
  created: "finance/accounts-payable.created",
  updated: "finance/accounts-payable.updated",
  submitted: "finance/accounts-payable.submitted",
  approved: "finance/accounts-payable.approved",
  rejected: "finance/accounts-payable.rejected",
  cancelled: "finance/accounts-payable.cancelled",
  closed: "finance/accounts-payable.closed",
  riskDetected: "finance/accounts-payable.risk-detected",
  nextActionRecommended: "finance/accounts-payable.next-action-recommended",
} as const;
