export const events = {
  created: "sales/commissions.created",
  updated: "sales/commissions.updated",
  submitted: "sales/commissions.submitted",
  approved: "sales/commissions.approved",
  rejected: "sales/commissions.rejected",
  cancelled: "sales/commissions.cancelled",
  closed: "sales/commissions.closed",
  riskDetected: "sales/commissions.risk-detected",
  nextActionRecommended: "sales/commissions.next-action-recommended",
} as const;
