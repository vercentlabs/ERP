export const permissions = {
  read: "inventory/valuation:read",
  create: "inventory/valuation:create",
  update: "inventory/valuation:update",
  submit: "inventory/valuation:submit",
  approve: "inventory/valuation:approve",
  reject: "inventory/valuation:reject",
  cancel: "inventory/valuation:cancel",
  close: "inventory/valuation:close",
  report: "inventory/valuation:report",
} as const;

export type ValuationPermission = (typeof permissions)[keyof typeof permissions];
