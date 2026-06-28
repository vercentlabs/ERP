export const events = {
  created: "master-data/suppliers.created",
  updated: "master-data/suppliers.updated",
  submitted: "master-data/suppliers.submitted",
  approved: "master-data/suppliers.approved",
  rejected: "master-data/suppliers.rejected",
  cancelled: "master-data/suppliers.cancelled",
  closed: "master-data/suppliers.closed",
  riskDetected: "master-data/suppliers.risk-detected",
  nextActionRecommended: "master-data/suppliers.next-action-recommended",
} as const;
