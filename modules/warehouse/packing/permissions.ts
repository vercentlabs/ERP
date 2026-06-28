export const permissions = {
  read: "warehouse/packing:read",
  create: "warehouse/packing:create",
  update: "warehouse/packing:update",
  submit: "warehouse/packing:submit",
  approve: "warehouse/packing:approve",
  reject: "warehouse/packing:reject",
  cancel: "warehouse/packing:cancel",
  close: "warehouse/packing:close",
  report: "warehouse/packing:report",
} as const;

export type PackingPermission = (typeof permissions)[keyof typeof permissions];
