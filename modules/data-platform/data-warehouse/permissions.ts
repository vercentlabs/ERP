export const permissions = {
  read: "data-platform/data-warehouse:read",
  create: "data-platform/data-warehouse:create",
  update: "data-platform/data-warehouse:update",
  submit: "data-platform/data-warehouse:submit",
  approve: "data-platform/data-warehouse:approve",
  reject: "data-platform/data-warehouse:reject",
  cancel: "data-platform/data-warehouse:cancel",
  close: "data-platform/data-warehouse:close",
  report: "data-platform/data-warehouse:report",
} as const;

export type DataWarehousePermission = (typeof permissions)[keyof typeof permissions];
