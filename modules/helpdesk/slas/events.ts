export const events = {
  created: "helpdesk/slas.created",
  updated: "helpdesk/slas.updated",
  submitted: "helpdesk/slas.submitted",
  approved: "helpdesk/slas.approved",
  rejected: "helpdesk/slas.rejected",
  cancelled: "helpdesk/slas.cancelled",
  closed: "helpdesk/slas.closed",
  riskDetected: "helpdesk/slas.risk-detected",
  nextActionRecommended: "helpdesk/slas.next-action-recommended",
} as const;
