export const events = {
  created: "crm/customers.created",
  updated: "crm/customers.updated",
  submitted: "crm/customers.submitted",
  approved: "crm/customers.approved",
  rejected: "crm/customers.rejected",
  cancelled: "crm/customers.cancelled",
  closed: "crm/customers.closed",
  riskDetected: "crm/customers.risk-detected",
  nextActionRecommended: "crm/customers.next-action-recommended",
} as const;
