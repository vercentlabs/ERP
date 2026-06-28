export const events = {
  created: "crm/segments.created",
  updated: "crm/segments.updated",
  submitted: "crm/segments.submitted",
  approved: "crm/segments.approved",
  rejected: "crm/segments.rejected",
  cancelled: "crm/segments.cancelled",
  closed: "crm/segments.closed",
  riskDetected: "crm/segments.risk-detected",
  nextActionRecommended: "crm/segments.next-action-recommended",
} as const;
