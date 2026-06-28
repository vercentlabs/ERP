export const permissions = {
  read: "warehouse/bins:read",
  create: "warehouse/bins:create",
  update: "warehouse/bins:update",
  submit: "warehouse/bins:submit",
  approve: "warehouse/bins:approve",
  reject: "warehouse/bins:reject",
  cancel: "warehouse/bins:cancel",
  close: "warehouse/bins:close",
  report: "warehouse/bins:report",
} as const;

export type BinsPermission = (typeof permissions)[keyof typeof permissions];
