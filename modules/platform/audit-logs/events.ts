export const events = {
  created: "platform/audit-logs.created",
  updated: "platform/audit-logs.updated",
  submitted: "platform/audit-logs.submitted",
  approved: "platform/audit-logs.approved",
  rejected: "platform/audit-logs.rejected",
  cancelled: "platform/audit-logs.cancelled",
  closed: "platform/audit-logs.closed",
  riskDetected: "platform/audit-logs.risk-detected",
  nextActionRecommended: "platform/audit-logs.next-action-recommended",
} as const;
