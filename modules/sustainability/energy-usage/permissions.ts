export const permissions = {
  read: "sustainability/energy-usage:read",
  create: "sustainability/energy-usage:create",
  update: "sustainability/energy-usage:update",
  submit: "sustainability/energy-usage:submit",
  approve: "sustainability/energy-usage:approve",
  reject: "sustainability/energy-usage:reject",
  cancel: "sustainability/energy-usage:cancel",
  close: "sustainability/energy-usage:close",
  report: "sustainability/energy-usage:report",
} as const;

export type EnergyUsagePermission = (typeof permissions)[keyof typeof permissions];
