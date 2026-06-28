export const permissions = {
  read: "risk-management/mitigations:read",
  create: "risk-management/mitigations:create",
  update: "risk-management/mitigations:update",
  submit: "risk-management/mitigations:submit",
  approve: "risk-management/mitigations:approve",
  reject: "risk-management/mitigations:reject",
  cancel: "risk-management/mitigations:cancel",
  close: "risk-management/mitigations:close",
  report: "risk-management/mitigations:report",
} as const;

export type MitigationsPermission = (typeof permissions)[keyof typeof permissions];
