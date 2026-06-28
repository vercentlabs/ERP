export const permissions = {
  read: "risk-management/risk-register:read",
  create: "risk-management/risk-register:create",
  update: "risk-management/risk-register:update",
  submit: "risk-management/risk-register:submit",
  approve: "risk-management/risk-register:approve",
  reject: "risk-management/risk-register:reject",
  cancel: "risk-management/risk-register:cancel",
  close: "risk-management/risk-register:close",
  report: "risk-management/risk-register:report",
} as const;

export type RiskRegisterPermission = (typeof permissions)[keyof typeof permissions];
