export const events = {
  created: "payroll/payroll-runs.created",
  updated: "payroll/payroll-runs.updated",
  submitted: "payroll/payroll-runs.submitted",
  approved: "payroll/payroll-runs.approved",
  rejected: "payroll/payroll-runs.rejected",
  cancelled: "payroll/payroll-runs.cancelled",
  closed: "payroll/payroll-runs.closed",
  riskDetected: "payroll/payroll-runs.risk-detected",
  nextActionRecommended: "payroll/payroll-runs.next-action-recommended",
} as const;
