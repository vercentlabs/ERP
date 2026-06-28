export const permissions = {
  read: "master-data/address-book:read",
  create: "master-data/address-book:create",
  update: "master-data/address-book:update",
  submit: "master-data/address-book:submit",
  approve: "master-data/address-book:approve",
  reject: "master-data/address-book:reject",
  cancel: "master-data/address-book:cancel",
  close: "master-data/address-book:close",
  report: "master-data/address-book:report",
} as const;

export type AddressBookPermission = (typeof permissions)[keyof typeof permissions];
