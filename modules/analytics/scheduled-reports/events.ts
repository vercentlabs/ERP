export const events = {
  created: "analytics/scheduled-reports.created",
  updated: "analytics/scheduled-reports.updated",
  submitted: "analytics/scheduled-reports.submitted",
  approved: "analytics/scheduled-reports.approved",
  rejected: "analytics/scheduled-reports.rejected",
  cancelled: "analytics/scheduled-reports.cancelled",
  closed: "analytics/scheduled-reports.closed",
  riskDetected: "analytics/scheduled-reports.risk-detected",
  nextActionRecommended: "analytics/scheduled-reports.next-action-recommended",
} as const;
