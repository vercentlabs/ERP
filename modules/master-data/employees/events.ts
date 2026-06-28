export const events = {
  created: "master-data/employees.created",
  updated: "master-data/employees.updated",
  submitted: "master-data/employees.submitted",
  approved: "master-data/employees.approved",
  rejected: "master-data/employees.rejected",
  cancelled: "master-data/employees.cancelled",
  closed: "master-data/employees.closed",
  riskDetected: "master-data/employees.risk-detected",
  nextActionRecommended: "master-data/employees.next-action-recommended",
} as const;
