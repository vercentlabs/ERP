export const permissions = {
  read: "risk-management/risk-assessments:read",
  create: "risk-management/risk-assessments:create",
  update: "risk-management/risk-assessments:update",
  submit: "risk-management/risk-assessments:submit",
  approve: "risk-management/risk-assessments:approve",
  reject: "risk-management/risk-assessments:reject",
  cancel: "risk-management/risk-assessments:cancel",
  close: "risk-management/risk-assessments:close",
  report: "risk-management/risk-assessments:report",
} as const;

export type RiskAssessmentsPermission = (typeof permissions)[keyof typeof permissions];
