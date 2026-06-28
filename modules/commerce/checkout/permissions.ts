export const permissions = {
  read: "commerce/checkout:read",
  create: "commerce/checkout:create",
  update: "commerce/checkout:update",
  submit: "commerce/checkout:submit",
  approve: "commerce/checkout:approve",
  reject: "commerce/checkout:reject",
  cancel: "commerce/checkout:cancel",
  close: "commerce/checkout:close",
  report: "commerce/checkout:report",
} as const;

export type CheckoutPermission = (typeof permissions)[keyof typeof permissions];
