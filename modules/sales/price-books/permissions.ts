export const permissions = {
  read: "sales/price-books:read",
  create: "sales/price-books:create",
  update: "sales/price-books:update",
  submit: "sales/price-books:submit",
  approve: "sales/price-books:approve",
  reject: "sales/price-books:reject",
  cancel: "sales/price-books:cancel",
  close: "sales/price-books:close",
  report: "sales/price-books:report",
} as const;

export type PriceBooksPermission = (typeof permissions)[keyof typeof permissions];
