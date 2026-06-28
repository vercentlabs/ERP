export const events = {
  created: "helpdesk/queues.created",
  updated: "helpdesk/queues.updated",
  submitted: "helpdesk/queues.submitted",
  approved: "helpdesk/queues.approved",
  rejected: "helpdesk/queues.rejected",
  cancelled: "helpdesk/queues.cancelled",
  closed: "helpdesk/queues.closed",
  riskDetected: "helpdesk/queues.risk-detected",
  nextActionRecommended: "helpdesk/queues.next-action-recommended",
} as const;
