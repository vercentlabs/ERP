export const events = {
  created: "helpdesk/returns-repairs.created",
  updated: "helpdesk/returns-repairs.updated",
  submitted: "helpdesk/returns-repairs.submitted",
  approved: "helpdesk/returns-repairs.approved",
  rejected: "helpdesk/returns-repairs.rejected",
  cancelled: "helpdesk/returns-repairs.cancelled",
  closed: "helpdesk/returns-repairs.closed",
  riskDetected: "helpdesk/returns-repairs.risk-detected",
  nextActionRecommended: "helpdesk/returns-repairs.next-action-recommended",
} as const;
