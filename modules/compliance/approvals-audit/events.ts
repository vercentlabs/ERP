export const events = {
  created: "compliance/approvals-audit.created",
  updated: "compliance/approvals-audit.updated",
  submitted: "compliance/approvals-audit.submitted",
  approved: "compliance/approvals-audit.approved",
  rejected: "compliance/approvals-audit.rejected",
  cancelled: "compliance/approvals-audit.cancelled",
  closed: "compliance/approvals-audit.closed",
  riskDetected: "compliance/approvals-audit.risk-detected",
  nextActionRecommended: "compliance/approvals-audit.next-action-recommended",
} as const;
