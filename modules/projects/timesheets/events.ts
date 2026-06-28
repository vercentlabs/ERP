export const events = {
  created: "projects/timesheets.created",
  updated: "projects/timesheets.updated",
  submitted: "projects/timesheets.submitted",
  approved: "projects/timesheets.approved",
  rejected: "projects/timesheets.rejected",
  cancelled: "projects/timesheets.cancelled",
  closed: "projects/timesheets.closed",
  riskDetected: "projects/timesheets.risk-detected",
  nextActionRecommended: "projects/timesheets.next-action-recommended",
} as const;
