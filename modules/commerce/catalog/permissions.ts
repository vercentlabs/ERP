export const permissions = {
  read: "commerce/catalog:read",
  create: "commerce/catalog:create",
  update: "commerce/catalog:update",
  submit: "commerce/catalog:submit",
  approve: "commerce/catalog:approve",
  reject: "commerce/catalog:reject",
  cancel: "commerce/catalog:cancel",
  close: "commerce/catalog:close",
  report: "commerce/catalog:report",
} as const;

export type CatalogPermission = (typeof permissions)[keyof typeof permissions];
