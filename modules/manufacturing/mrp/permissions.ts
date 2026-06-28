export const permissions = {
  read: "manufacturing/mrp:read",
  create: "manufacturing/mrp:create",
  update: "manufacturing/mrp:update",
  submit: "manufacturing/mrp:submit",
  approve: "manufacturing/mrp:approve",
  reject: "manufacturing/mrp:reject",
  cancel: "manufacturing/mrp:cancel",
  close: "manufacturing/mrp:close",
  report: "manufacturing/mrp:report",
} as const;

export type MrpPermission = (typeof permissions)[keyof typeof permissions];
