export const permissions = {
  read: "procurement/three-way-match:read",
  create: "procurement/three-way-match:create",
  update: "procurement/three-way-match:update",
  submit: "procurement/three-way-match:submit",
  approve: "procurement/three-way-match:approve",
  reject: "procurement/three-way-match:reject",
  cancel: "procurement/three-way-match:cancel",
  close: "procurement/three-way-match:close",
  report: "procurement/three-way-match:report",
} as const;

export type ThreeWayMatchPermission = (typeof permissions)[keyof typeof permissions];
