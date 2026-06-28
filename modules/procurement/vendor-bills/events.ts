export const events = {
  created: "procurement/vendor-bills.created",
  updated: "procurement/vendor-bills.updated",
  submitted: "procurement/vendor-bills.submitted",
  approved: "procurement/vendor-bills.approved",
  rejected: "procurement/vendor-bills.rejected",
  cancelled: "procurement/vendor-bills.cancelled",
  closed: "procurement/vendor-bills.closed",
  riskDetected: "procurement/vendor-bills.risk-detected",
  nextActionRecommended: "procurement/vendor-bills.next-action-recommended",
} as const;
