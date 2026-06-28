export const permissions = {
  read: "master-data/suppliers:read",
  create: "master-data/suppliers:create",
  update: "master-data/suppliers:update",
  submit: "master-data/suppliers:submit",
  approve: "master-data/suppliers:approve",
  reject: "master-data/suppliers:reject",
  cancel: "master-data/suppliers:cancel",
  close: "master-data/suppliers:close",
  report: "master-data/suppliers:report",
} as const;

export type SuppliersPermission = (typeof permissions)[keyof typeof permissions];
