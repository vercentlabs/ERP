export const permissions = {
  read: "compliance/data-retention:read",
  create: "compliance/data-retention:create",
  update: "compliance/data-retention:update",
  submit: "compliance/data-retention:submit",
  approve: "compliance/data-retention:approve",
  reject: "compliance/data-retention:reject",
  cancel: "compliance/data-retention:cancel",
  close: "compliance/data-retention:close",
  report: "compliance/data-retention:report",
} as const;

export type DataRetentionPermission = (typeof permissions)[keyof typeof permissions];
