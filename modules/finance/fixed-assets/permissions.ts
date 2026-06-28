export const permissions = {
  read: "finance/fixed-assets:read",
  create: "finance/fixed-assets:create",
  update: "finance/fixed-assets:update",
  submit: "finance/fixed-assets:submit",
  approve: "finance/fixed-assets:approve",
  reject: "finance/fixed-assets:reject",
  cancel: "finance/fixed-assets:cancel",
  close: "finance/fixed-assets:close",
  report: "finance/fixed-assets:report",
} as const;

export type FixedAssetsPermission = (typeof permissions)[keyof typeof permissions];
