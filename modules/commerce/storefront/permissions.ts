export const permissions = {
  read: "commerce/storefront:read",
  create: "commerce/storefront:create",
  update: "commerce/storefront:update",
  submit: "commerce/storefront:submit",
  approve: "commerce/storefront:approve",
  reject: "commerce/storefront:reject",
  cancel: "commerce/storefront:cancel",
  close: "commerce/storefront:close",
  report: "commerce/storefront:report",
} as const;

export type StorefrontPermission = (typeof permissions)[keyof typeof permissions];
