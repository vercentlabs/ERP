export const permissions = {
  read: "inventory/item-categories:read",
  create: "inventory/item-categories:create",
  update: "inventory/item-categories:update",
  submit: "inventory/item-categories:submit",
  approve: "inventory/item-categories:approve",
  reject: "inventory/item-categories:reject",
  cancel: "inventory/item-categories:cancel",
  close: "inventory/item-categories:close",
  report: "inventory/item-categories:report",
} as const;

export type ItemCategoriesPermission = (typeof permissions)[keyof typeof permissions];
