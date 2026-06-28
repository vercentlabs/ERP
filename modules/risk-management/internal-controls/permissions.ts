export const permissions = {
  read: "risk-management/internal-controls:read",
  create: "risk-management/internal-controls:create",
  update: "risk-management/internal-controls:update",
  submit: "risk-management/internal-controls:submit",
  approve: "risk-management/internal-controls:approve",
  reject: "risk-management/internal-controls:reject",
  cancel: "risk-management/internal-controls:cancel",
  close: "risk-management/internal-controls:close",
  report: "risk-management/internal-controls:report",
} as const;

export type InternalControlsPermission = (typeof permissions)[keyof typeof permissions];
