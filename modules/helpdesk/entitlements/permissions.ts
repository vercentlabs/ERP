export const permissions = {
  read: "helpdesk/entitlements:read",
  create: "helpdesk/entitlements:create",
  update: "helpdesk/entitlements:update",
  submit: "helpdesk/entitlements:submit",
  approve: "helpdesk/entitlements:approve",
  reject: "helpdesk/entitlements:reject",
  cancel: "helpdesk/entitlements:cancel",
  close: "helpdesk/entitlements:close",
  report: "helpdesk/entitlements:report",
} as const;

export type EntitlementsPermission = (typeof permissions)[keyof typeof permissions];
