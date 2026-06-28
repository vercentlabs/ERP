export const permissions = {
  read: "compliance/controls:read",
  create: "compliance/controls:create",
  update: "compliance/controls:update",
  submit: "compliance/controls:submit",
  approve: "compliance/controls:approve",
  reject: "compliance/controls:reject",
  cancel: "compliance/controls:cancel",
  close: "compliance/controls:close",
  report: "compliance/controls:report",
} as const;

export type ControlsPermission = (typeof permissions)[keyof typeof permissions];
