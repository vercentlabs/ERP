export const permissions = {
  read: "maintenance/spare-parts:read",
  create: "maintenance/spare-parts:create",
  update: "maintenance/spare-parts:update",
  submit: "maintenance/spare-parts:submit",
  approve: "maintenance/spare-parts:approve",
  reject: "maintenance/spare-parts:reject",
  cancel: "maintenance/spare-parts:cancel",
  close: "maintenance/spare-parts:close",
  report: "maintenance/spare-parts:report",
} as const;

export type SparePartsPermission = (typeof permissions)[keyof typeof permissions];
