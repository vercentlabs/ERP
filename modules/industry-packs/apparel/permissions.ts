export const permissions = {
  read: "industry-packs/apparel:read",
  create: "industry-packs/apparel:create",
  update: "industry-packs/apparel:update",
  submit: "industry-packs/apparel:submit",
  approve: "industry-packs/apparel:approve",
  reject: "industry-packs/apparel:reject",
  cancel: "industry-packs/apparel:cancel",
  close: "industry-packs/apparel:close",
  report: "industry-packs/apparel:report",
} as const;

export type ApparelPermission = (typeof permissions)[keyof typeof permissions];
