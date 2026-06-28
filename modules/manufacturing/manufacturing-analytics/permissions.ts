export const permissions = {
  read: "manufacturing/manufacturing-analytics:read",
  create: "manufacturing/manufacturing-analytics:create",
  update: "manufacturing/manufacturing-analytics:update",
  submit: "manufacturing/manufacturing-analytics:submit",
  approve: "manufacturing/manufacturing-analytics:approve",
  reject: "manufacturing/manufacturing-analytics:reject",
  cancel: "manufacturing/manufacturing-analytics:cancel",
  close: "manufacturing/manufacturing-analytics:close",
  report: "manufacturing/manufacturing-analytics:report",
} as const;

export type ManufacturingAnalyticsPermission = (typeof permissions)[keyof typeof permissions];
