export const events = {
  created: "crm/accounts.created",
  updated: "crm/accounts.updated",
  submitted: "crm/accounts.submitted",
  approved: "crm/accounts.approved",
  rejected: "crm/accounts.rejected",
  cancelled: "crm/accounts.cancelled",
  closed: "crm/accounts.closed",
  riskDetected: "crm/accounts.risk-detected",
  nextActionRecommended: "crm/accounts.next-action-recommended",
} as const;
