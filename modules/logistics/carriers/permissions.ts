export const permissions = {
  read: "logistics/carriers:read",
  create: "logistics/carriers:create",
  update: "logistics/carriers:update",
  submit: "logistics/carriers:submit",
  approve: "logistics/carriers:approve",
  reject: "logistics/carriers:reject",
  cancel: "logistics/carriers:cancel",
  close: "logistics/carriers:close",
  report: "logistics/carriers:report",
} as const;

export type CarriersPermission = (typeof permissions)[keyof typeof permissions];
