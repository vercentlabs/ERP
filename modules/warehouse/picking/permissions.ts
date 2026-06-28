export const permissions = {
  read: "warehouse/picking:read",
  create: "warehouse/picking:create",
  update: "warehouse/picking:update",
  submit: "warehouse/picking:submit",
  approve: "warehouse/picking:approve",
  reject: "warehouse/picking:reject",
  cancel: "warehouse/picking:cancel",
  close: "warehouse/picking:close",
  report: "warehouse/picking:report",
} as const;

export type PickingPermission = (typeof permissions)[keyof typeof permissions];
