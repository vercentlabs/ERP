export const events = {
  created: "payroll/payroll-periods.created",
  updated: "payroll/payroll-periods.updated",
  submitted: "payroll/payroll-periods.submitted",
  approved: "payroll/payroll-periods.approved",
  rejected: "payroll/payroll-periods.rejected",
  cancelled: "payroll/payroll-periods.cancelled",
  closed: "payroll/payroll-periods.closed",
  riskDetected: "payroll/payroll-periods.risk-detected",
  nextActionRecommended: "payroll/payroll-periods.next-action-recommended",
} as const;
