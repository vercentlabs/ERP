export const permissions = {
  read: "warehouse/waves:read",
  create: "warehouse/waves:create",
  update: "warehouse/waves:update",
  submit: "warehouse/waves:submit",
  approve: "warehouse/waves:approve",
  reject: "warehouse/waves:reject",
  cancel: "warehouse/waves:cancel",
  close: "warehouse/waves:close",
  report: "warehouse/waves:report",
} as const;

export type WavesPermission = (typeof permissions)[keyof typeof permissions];
