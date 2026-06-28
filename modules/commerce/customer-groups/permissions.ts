export const permissions = {
  read: "commerce/customer-groups:read",
  create: "commerce/customer-groups:create",
  update: "commerce/customer-groups:update",
  submit: "commerce/customer-groups:submit",
  approve: "commerce/customer-groups:approve",
  reject: "commerce/customer-groups:reject",
  cancel: "commerce/customer-groups:cancel",
  close: "commerce/customer-groups:close",
  report: "commerce/customer-groups:report",
} as const;

export type CustomerGroupsPermission = (typeof permissions)[keyof typeof permissions];
