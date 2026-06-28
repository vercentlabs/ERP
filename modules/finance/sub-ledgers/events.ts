export const events = {
  created: "finance/sub-ledgers.created",
  updated: "finance/sub-ledgers.updated",
  submitted: "finance/sub-ledgers.submitted",
  approved: "finance/sub-ledgers.approved",
  rejected: "finance/sub-ledgers.rejected",
  cancelled: "finance/sub-ledgers.cancelled",
  closed: "finance/sub-ledgers.closed",
  riskDetected: "finance/sub-ledgers.risk-detected",
  nextActionRecommended: "finance/sub-ledgers.next-action-recommended",
} as const;
