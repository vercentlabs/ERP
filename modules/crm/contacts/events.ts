export const events = {
  created: "crm/contacts.created",
  updated: "crm/contacts.updated",
  submitted: "crm/contacts.submitted",
  approved: "crm/contacts.approved",
  rejected: "crm/contacts.rejected",
  cancelled: "crm/contacts.cancelled",
  closed: "crm/contacts.closed",
  riskDetected: "crm/contacts.risk-detected",
  nextActionRecommended: "crm/contacts.next-action-recommended",
} as const;
