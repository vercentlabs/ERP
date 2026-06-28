export const events = {
  created: "helpdesk/entitlements.created",
  updated: "helpdesk/entitlements.updated",
  submitted: "helpdesk/entitlements.submitted",
  approved: "helpdesk/entitlements.approved",
  rejected: "helpdesk/entitlements.rejected",
  cancelled: "helpdesk/entitlements.cancelled",
  closed: "helpdesk/entitlements.closed",
  riskDetected: "helpdesk/entitlements.risk-detected",
  nextActionRecommended: "helpdesk/entitlements.next-action-recommended",
} as const;
