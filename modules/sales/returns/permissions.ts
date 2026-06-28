export const permissions = {
  read: "sales/returns:read",
  create: "sales/returns:create",
  update: "sales/returns:update",
  submit: "sales/returns:submit",
  approve: "sales/returns:approve",
  reject: "sales/returns:reject",
  cancel: "sales/returns:cancel",
  close: "sales/returns:close",
  report: "sales/returns:report",
} as const;

export type ReturnsPermission = (typeof permissions)[keyof typeof permissions];
