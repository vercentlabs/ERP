export const events = {
  created: "helpdesk/escalations.created",
  updated: "helpdesk/escalations.updated",
  submitted: "helpdesk/escalations.submitted",
  approved: "helpdesk/escalations.approved",
  rejected: "helpdesk/escalations.rejected",
  cancelled: "helpdesk/escalations.cancelled",
  closed: "helpdesk/escalations.closed",
  riskDetected: "helpdesk/escalations.risk-detected",
  nextActionRecommended: "helpdesk/escalations.next-action-recommended",
} as const;
