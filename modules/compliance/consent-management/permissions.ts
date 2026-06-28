export const permissions = {
  read: "compliance/consent-management:read",
  create: "compliance/consent-management:create",
  update: "compliance/consent-management:update",
  submit: "compliance/consent-management:submit",
  approve: "compliance/consent-management:approve",
  reject: "compliance/consent-management:reject",
  cancel: "compliance/consent-management:cancel",
  close: "compliance/consent-management:close",
  report: "compliance/consent-management:report",
} as const;

export type ConsentManagementPermission = (typeof permissions)[keyof typeof permissions];
