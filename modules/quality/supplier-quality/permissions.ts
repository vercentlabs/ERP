export const permissions = {
  read: "quality/supplier-quality:read",
  create: "quality/supplier-quality:create",
  update: "quality/supplier-quality:update",
  submit: "quality/supplier-quality:submit",
  approve: "quality/supplier-quality:approve",
  reject: "quality/supplier-quality:reject",
  cancel: "quality/supplier-quality:cancel",
  close: "quality/supplier-quality:close",
  report: "quality/supplier-quality:report",
} as const;

export type SupplierQualityPermission = (typeof permissions)[keyof typeof permissions];
