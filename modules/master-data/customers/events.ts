export const events = {
  created: "master-data/customers.created",
  updated: "master-data/customers.updated",
  submitted: "master-data/customers.submitted",
  approved: "master-data/customers.approved",
  rejected: "master-data/customers.rejected",
  cancelled: "master-data/customers.cancelled",
  closed: "master-data/customers.closed",
  riskDetected: "master-data/customers.risk-detected",
  nextActionRecommended: "master-data/customers.next-action-recommended",
} as const;
