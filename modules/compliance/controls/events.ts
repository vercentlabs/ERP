export const events = {
  created: "compliance/controls.created",
  updated: "compliance/controls.updated",
  submitted: "compliance/controls.submitted",
  approved: "compliance/controls.approved",
  rejected: "compliance/controls.rejected",
  cancelled: "compliance/controls.cancelled",
  closed: "compliance/controls.closed",
  riskDetected: "compliance/controls.risk-detected",
  nextActionRecommended: "compliance/controls.next-action-recommended",
} as const;
