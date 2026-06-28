export const events = {
  created: "helpdesk/tickets.created",
  updated: "helpdesk/tickets.updated",
  submitted: "helpdesk/tickets.submitted",
  approved: "helpdesk/tickets.approved",
  rejected: "helpdesk/tickets.rejected",
  cancelled: "helpdesk/tickets.cancelled",
  closed: "helpdesk/tickets.closed",
  riskDetected: "helpdesk/tickets.risk-detected",
  nextActionRecommended: "helpdesk/tickets.next-action-recommended",
} as const;
