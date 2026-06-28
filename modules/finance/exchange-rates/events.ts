export const events = {
  created: "finance/exchange-rates.created",
  updated: "finance/exchange-rates.updated",
  submitted: "finance/exchange-rates.submitted",
  approved: "finance/exchange-rates.approved",
  rejected: "finance/exchange-rates.rejected",
  cancelled: "finance/exchange-rates.cancelled",
  closed: "finance/exchange-rates.closed",
  riskDetected: "finance/exchange-rates.risk-detected",
  nextActionRecommended: "finance/exchange-rates.next-action-recommended",
} as const;
