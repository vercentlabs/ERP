export const events = {
  created: "field-service/dispatch.created",
  updated: "field-service/dispatch.updated",
  submitted: "field-service/dispatch.submitted",
  approved: "field-service/dispatch.approved",
  rejected: "field-service/dispatch.rejected",
  cancelled: "field-service/dispatch.cancelled",
  closed: "field-service/dispatch.closed",
  riskDetected: "field-service/dispatch.risk-detected",
  nextActionRecommended: "field-service/dispatch.next-action-recommended",
} as const;
