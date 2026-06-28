export const events = {
  created: "payroll/tax-declarations.created",
  updated: "payroll/tax-declarations.updated",
  submitted: "payroll/tax-declarations.submitted",
  approved: "payroll/tax-declarations.approved",
  rejected: "payroll/tax-declarations.rejected",
  cancelled: "payroll/tax-declarations.cancelled",
  closed: "payroll/tax-declarations.closed",
  riskDetected: "payroll/tax-declarations.risk-detected",
  nextActionRecommended: "payroll/tax-declarations.next-action-recommended",
} as const;
