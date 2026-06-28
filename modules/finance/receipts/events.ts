export const events = {
  created: "finance/receipts.created",
  updated: "finance/receipts.updated",
  submitted: "finance/receipts.submitted",
  approved: "finance/receipts.approved",
  rejected: "finance/receipts.rejected",
  cancelled: "finance/receipts.cancelled",
  closed: "finance/receipts.closed",
  riskDetected: "finance/receipts.risk-detected",
  nextActionRecommended: "finance/receipts.next-action-recommended",
} as const;
