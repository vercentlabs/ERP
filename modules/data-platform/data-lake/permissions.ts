export const permissions = {
  read: "data-platform/data-lake:read",
  create: "data-platform/data-lake:create",
  update: "data-platform/data-lake:update",
  submit: "data-platform/data-lake:submit",
  approve: "data-platform/data-lake:approve",
  reject: "data-platform/data-lake:reject",
  cancel: "data-platform/data-lake:cancel",
  close: "data-platform/data-lake:close",
  report: "data-platform/data-lake:report",
} as const;

export type DataLakePermission = (typeof permissions)[keyof typeof permissions];
