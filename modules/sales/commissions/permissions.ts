export const permissions = {
  read: "sales/commissions:read",
  create: "sales/commissions:create",
  update: "sales/commissions:update",
  submit: "sales/commissions:submit",
  approve: "sales/commissions:approve",
  reject: "sales/commissions:reject",
  cancel: "sales/commissions:cancel",
  close: "sales/commissions:close",
  report: "sales/commissions:report",
} as const;

export type CommissionsPermission = (typeof permissions)[keyof typeof permissions];
