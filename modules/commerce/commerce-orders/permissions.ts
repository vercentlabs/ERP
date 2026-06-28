export const permissions = {
  read: "commerce/commerce-orders:read",
  create: "commerce/commerce-orders:create",
  update: "commerce/commerce-orders:update",
  submit: "commerce/commerce-orders:submit",
  approve: "commerce/commerce-orders:approve",
  reject: "commerce/commerce-orders:reject",
  cancel: "commerce/commerce-orders:cancel",
  close: "commerce/commerce-orders:close",
  report: "commerce/commerce-orders:report",
} as const;

export type CommerceOrdersPermission = (typeof permissions)[keyof typeof permissions];
