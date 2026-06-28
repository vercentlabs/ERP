export const permissions = {
  read: "quality/customer-quality:read",
  create: "quality/customer-quality:create",
  update: "quality/customer-quality:update",
  submit: "quality/customer-quality:submit",
  approve: "quality/customer-quality:approve",
  reject: "quality/customer-quality:reject",
  cancel: "quality/customer-quality:cancel",
  close: "quality/customer-quality:close",
  report: "quality/customer-quality:report",
} as const;

export type CustomerQualityPermission = (typeof permissions)[keyof typeof permissions];
