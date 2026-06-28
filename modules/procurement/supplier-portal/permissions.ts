export const permissions = {
  read: "procurement/supplier-portal:read",
  create: "procurement/supplier-portal:create",
  update: "procurement/supplier-portal:update",
  submit: "procurement/supplier-portal:submit",
  approve: "procurement/supplier-portal:approve",
  reject: "procurement/supplier-portal:reject",
  cancel: "procurement/supplier-portal:cancel",
  close: "procurement/supplier-portal:close",
  report: "procurement/supplier-portal:report",
} as const;

export type SupplierPortalPermission = (typeof permissions)[keyof typeof permissions];
