export const permissions = {
  read: "data-platform/cdc:read",
  create: "data-platform/cdc:create",
  update: "data-platform/cdc:update",
  submit: "data-platform/cdc:submit",
  approve: "data-platform/cdc:approve",
  reject: "data-platform/cdc:reject",
  cancel: "data-platform/cdc:cancel",
  close: "data-platform/cdc:close",
  report: "data-platform/cdc:report",
} as const;

export type CdcPermission = (typeof permissions)[keyof typeof permissions];
