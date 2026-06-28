export const permissions = {
  read: "risk-management/policy-management:read",
  create: "risk-management/policy-management:create",
  update: "risk-management/policy-management:update",
  submit: "risk-management/policy-management:submit",
  approve: "risk-management/policy-management:approve",
  reject: "risk-management/policy-management:reject",
  cancel: "risk-management/policy-management:cancel",
  close: "risk-management/policy-management:close",
  report: "risk-management/policy-management:report",
} as const;

export type PolicyManagementPermission = (typeof permissions)[keyof typeof permissions];
