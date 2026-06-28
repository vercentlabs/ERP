export const permissions = {
  read: "field-service/dispatch:read",
  create: "field-service/dispatch:create",
  update: "field-service/dispatch:update",
  submit: "field-service/dispatch:submit",
  approve: "field-service/dispatch:approve",
  reject: "field-service/dispatch:reject",
  cancel: "field-service/dispatch:cancel",
  close: "field-service/dispatch:close",
  report: "field-service/dispatch:report",
} as const;

export type DispatchPermission = (typeof permissions)[keyof typeof permissions];
