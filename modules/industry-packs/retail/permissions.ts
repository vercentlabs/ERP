export const permissions = {
  read: "industry-packs/retail:read",
  create: "industry-packs/retail:create",
  update: "industry-packs/retail:update",
  submit: "industry-packs/retail:submit",
  approve: "industry-packs/retail:approve",
  reject: "industry-packs/retail:reject",
  cancel: "industry-packs/retail:cancel",
  close: "industry-packs/retail:close",
  report: "industry-packs/retail:report",
} as const;

export type RetailPermission = (typeof permissions)[keyof typeof permissions];
