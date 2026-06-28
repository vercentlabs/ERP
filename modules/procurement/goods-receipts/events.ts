export const events = {
  created: "procurement/goods-receipts.created",
  updated: "procurement/goods-receipts.updated",
  submitted: "procurement/goods-receipts.submitted",
  approved: "procurement/goods-receipts.approved",
  rejected: "procurement/goods-receipts.rejected",
  cancelled: "procurement/goods-receipts.cancelled",
  closed: "procurement/goods-receipts.closed",
  riskDetected: "procurement/goods-receipts.risk-detected",
  nextActionRecommended: "procurement/goods-receipts.next-action-recommended",
} as const;
