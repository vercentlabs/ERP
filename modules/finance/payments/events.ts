export const events = {
  created: "finance/payments.created",
  updated: "finance/payments.updated",
  submitted: "finance/payments.submitted",
  approved: "finance/payments.approved",
  rejected: "finance/payments.rejected",
  cancelled: "finance/payments.cancelled",
  closed: "finance/payments.closed",
  riskDetected: "finance/payments.risk-detected",
  nextActionRecommended: "finance/payments.next-action-recommended",
} as const;
