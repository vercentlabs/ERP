export const permissions = {
  read: "commerce/coupons:read",
  create: "commerce/coupons:create",
  update: "commerce/coupons:update",
  submit: "commerce/coupons:submit",
  approve: "commerce/coupons:approve",
  reject: "commerce/coupons:reject",
  cancel: "commerce/coupons:cancel",
  close: "commerce/coupons:close",
  report: "commerce/coupons:report",
} as const;

export type CouponsPermission = (typeof permissions)[keyof typeof permissions];
