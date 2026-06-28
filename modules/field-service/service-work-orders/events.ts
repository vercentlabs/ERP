export const events = {
  created: "field-service/service-work-orders.created",
  updated: "field-service/service-work-orders.updated",
  submitted: "field-service/service-work-orders.submitted",
  approved: "field-service/service-work-orders.approved",
  rejected: "field-service/service-work-orders.rejected",
  cancelled: "field-service/service-work-orders.cancelled",
  closed: "field-service/service-work-orders.closed",
  riskDetected: "field-service/service-work-orders.risk-detected",
  nextActionRecommended: "field-service/service-work-orders.next-action-recommended",
} as const;
