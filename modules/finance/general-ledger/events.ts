export const events = {
  created: "finance/general-ledger.created",
  updated: "finance/general-ledger.updated",
  submitted: "finance/general-ledger.submitted",
  approved: "finance/general-ledger.approved",
  rejected: "finance/general-ledger.rejected",
  cancelled: "finance/general-ledger.cancelled",
  closed: "finance/general-ledger.closed",
  riskDetected: "finance/general-ledger.risk-detected",
  nextActionRecommended: "finance/general-ledger.next-action-recommended",
} as const;
