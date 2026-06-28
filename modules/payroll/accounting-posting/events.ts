export const events = {
  created: "payroll/accounting-posting.created",
  updated: "payroll/accounting-posting.updated",
  submitted: "payroll/accounting-posting.submitted",
  approved: "payroll/accounting-posting.approved",
  rejected: "payroll/accounting-posting.rejected",
  cancelled: "payroll/accounting-posting.cancelled",
  closed: "payroll/accounting-posting.closed",
  riskDetected: "payroll/accounting-posting.risk-detected",
  nextActionRecommended: "payroll/accounting-posting.next-action-recommended",
} as const;
