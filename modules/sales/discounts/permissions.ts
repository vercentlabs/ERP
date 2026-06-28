export const permissions = {
  read: "sales/discounts:read",
  create: "sales/discounts:create",
  update: "sales/discounts:update",
  submit: "sales/discounts:submit",
  approve: "sales/discounts:approve",
  reject: "sales/discounts:reject",
  cancel: "sales/discounts:cancel",
  close: "sales/discounts:close",
  report: "sales/discounts:report",
} as const;

export type DiscountsPermission = (typeof permissions)[keyof typeof permissions];
