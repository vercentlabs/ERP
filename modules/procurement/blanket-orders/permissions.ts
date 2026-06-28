export const permissions = {
  read: "procurement/blanket-orders:read",
  create: "procurement/blanket-orders:create",
  update: "procurement/blanket-orders:update",
  submit: "procurement/blanket-orders:submit",
  approve: "procurement/blanket-orders:approve",
  reject: "procurement/blanket-orders:reject",
  cancel: "procurement/blanket-orders:cancel",
  close: "procurement/blanket-orders:close",
  report: "procurement/blanket-orders:report",
} as const;

export type BlanketOrdersPermission = (typeof permissions)[keyof typeof permissions];
