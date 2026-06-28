export const permissions = {
  read: "warehouse/shipping:read",
  create: "warehouse/shipping:create",
  update: "warehouse/shipping:update",
  submit: "warehouse/shipping:submit",
  approve: "warehouse/shipping:approve",
  reject: "warehouse/shipping:reject",
  cancel: "warehouse/shipping:cancel",
  close: "warehouse/shipping:close",
  report: "warehouse/shipping:report",
} as const;

export type ShippingPermission = (typeof permissions)[keyof typeof permissions];
