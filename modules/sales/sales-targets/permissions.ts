export const permissions = {
  read: "sales/sales-targets:read",
  create: "sales/sales-targets:create",
  update: "sales/sales-targets:update",
  submit: "sales/sales-targets:submit",
  approve: "sales/sales-targets:approve",
  reject: "sales/sales-targets:reject",
  cancel: "sales/sales-targets:cancel",
  close: "sales/sales-targets:close",
  report: "sales/sales-targets:report",
} as const;

export type SalesTargetsPermission = (typeof permissions)[keyof typeof permissions];
