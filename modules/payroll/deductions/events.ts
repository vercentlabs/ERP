export const events = {
  created: "payroll/deductions.created",
  updated: "payroll/deductions.updated",
  submitted: "payroll/deductions.submitted",
  approved: "payroll/deductions.approved",
  rejected: "payroll/deductions.rejected",
  cancelled: "payroll/deductions.cancelled",
  closed: "payroll/deductions.closed",
  riskDetected: "payroll/deductions.risk-detected",
  nextActionRecommended: "payroll/deductions.next-action-recommended",
} as const;
