export const events = {
  created: "payroll/payslips.created",
  updated: "payroll/payslips.updated",
  submitted: "payroll/payslips.submitted",
  approved: "payroll/payslips.approved",
  rejected: "payroll/payslips.rejected",
  cancelled: "payroll/payslips.cancelled",
  closed: "payroll/payslips.closed",
  riskDetected: "payroll/payslips.risk-detected",
  nextActionRecommended: "payroll/payslips.next-action-recommended",
} as const;
