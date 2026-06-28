export const permissions = {
  read: "procurement/vendor-bills:read",
  create: "procurement/vendor-bills:create",
  update: "procurement/vendor-bills:update",
  submit: "procurement/vendor-bills:submit",
  approve: "procurement/vendor-bills:approve",
  reject: "procurement/vendor-bills:reject",
  cancel: "procurement/vendor-bills:cancel",
  close: "procurement/vendor-bills:close",
  report: "procurement/vendor-bills:report",
} as const;

export type VendorBillsPermission = (typeof permissions)[keyof typeof permissions];
