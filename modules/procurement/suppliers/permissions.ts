export const permissions = {
  read: "procurement/suppliers:read",
  create: "procurement/suppliers:create",
  update: "procurement/suppliers:update",
  submit: "procurement/suppliers:submit",
  approve: "procurement/suppliers:approve",
  reject: "procurement/suppliers:reject",
  cancel: "procurement/suppliers:cancel",
  close: "procurement/suppliers:close",
  report: "procurement/suppliers:report",
} as const;

export type SuppliersPermission = (typeof permissions)[keyof typeof permissions];
