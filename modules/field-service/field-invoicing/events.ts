export const events = {
  created: "field-service/field-invoicing.created",
  updated: "field-service/field-invoicing.updated",
  submitted: "field-service/field-invoicing.submitted",
  approved: "field-service/field-invoicing.approved",
  rejected: "field-service/field-invoicing.rejected",
  cancelled: "field-service/field-invoicing.cancelled",
  closed: "field-service/field-invoicing.closed",
  riskDetected: "field-service/field-invoicing.risk-detected",
  nextActionRecommended: "field-service/field-invoicing.next-action-recommended",
} as const;
