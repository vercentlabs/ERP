export const permissions = {
  read: "platform/naming-series:read",
  create: "platform/naming-series:create",
  update: "platform/naming-series:update",
  submit: "platform/naming-series:submit",
  approve: "platform/naming-series:approve",
  reject: "platform/naming-series:reject",
  cancel: "platform/naming-series:cancel",
  close: "platform/naming-series:close",
  report: "platform/naming-series:report",
} as const;

export type NamingSeriesPermission = (typeof permissions)[keyof typeof permissions];
