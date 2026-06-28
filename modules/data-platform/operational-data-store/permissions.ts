export const permissions = {
  read: "data-platform/operational-data-store:read",
  create: "data-platform/operational-data-store:create",
  update: "data-platform/operational-data-store:update",
  submit: "data-platform/operational-data-store:submit",
  approve: "data-platform/operational-data-store:approve",
  reject: "data-platform/operational-data-store:reject",
  cancel: "data-platform/operational-data-store:cancel",
  close: "data-platform/operational-data-store:close",
  report: "data-platform/operational-data-store:report",
} as const;

export type OperationalDataStorePermission = (typeof permissions)[keyof typeof permissions];
