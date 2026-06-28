export const permissions = {
  read: "warehouse/mobile-scanning:read",
  create: "warehouse/mobile-scanning:create",
  update: "warehouse/mobile-scanning:update",
  submit: "warehouse/mobile-scanning:submit",
  approve: "warehouse/mobile-scanning:approve",
  reject: "warehouse/mobile-scanning:reject",
  cancel: "warehouse/mobile-scanning:cancel",
  close: "warehouse/mobile-scanning:close",
  report: "warehouse/mobile-scanning:report",
} as const;

export type MobileScanningPermission = (typeof permissions)[keyof typeof permissions];
