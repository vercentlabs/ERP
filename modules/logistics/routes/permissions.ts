export const permissions = {
  read: "logistics/routes:read",
  create: "logistics/routes:create",
  update: "logistics/routes:update",
  submit: "logistics/routes:submit",
  approve: "logistics/routes:approve",
  reject: "logistics/routes:reject",
  cancel: "logistics/routes:cancel",
  close: "logistics/routes:close",
  report: "logistics/routes:report",
} as const;

export type RoutesPermission = (typeof permissions)[keyof typeof permissions];
