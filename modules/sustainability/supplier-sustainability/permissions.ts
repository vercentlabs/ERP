export const permissions = {
  read: "sustainability/supplier-sustainability:read",
  create: "sustainability/supplier-sustainability:create",
  update: "sustainability/supplier-sustainability:update",
  submit: "sustainability/supplier-sustainability:submit",
  approve: "sustainability/supplier-sustainability:approve",
  reject: "sustainability/supplier-sustainability:reject",
  cancel: "sustainability/supplier-sustainability:cancel",
  close: "sustainability/supplier-sustainability:close",
  report: "sustainability/supplier-sustainability:report",
} as const;

export type SupplierSustainabilityPermission = (typeof permissions)[keyof typeof permissions];
