export const events = {
  created: "sales/returns.created",
  updated: "sales/returns.updated",
  submitted: "sales/returns.submitted",
  approved: "sales/returns.approved",
  rejected: "sales/returns.rejected",
  cancelled: "sales/returns.cancelled",
  closed: "sales/returns.closed",
  riskDetected: "sales/returns.risk-detected",
  nextActionRecommended: "sales/returns.next-action-recommended",
} as const;
