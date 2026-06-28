export const permissions = {
  read: "procurement/supplier-quotations:read",
  create: "procurement/supplier-quotations:create",
  update: "procurement/supplier-quotations:update",
  submit: "procurement/supplier-quotations:submit",
  approve: "procurement/supplier-quotations:approve",
  reject: "procurement/supplier-quotations:reject",
  cancel: "procurement/supplier-quotations:cancel",
  close: "procurement/supplier-quotations:close",
  report: "procurement/supplier-quotations:report",
} as const;

export type SupplierQuotationsPermission = (typeof permissions)[keyof typeof permissions];
