export const permissions = {
  read: "manufacturing/production-orders:read",
  create: "manufacturing/production-orders:create",
  update: "manufacturing/production-orders:update",
  submit: "manufacturing/production-orders:submit",
  approve: "manufacturing/production-orders:approve",
  reject: "manufacturing/production-orders:reject",
  cancel: "manufacturing/production-orders:cancel",
  close: "manufacturing/production-orders:close",
  report: "manufacturing/production-orders:report",
} as const;

export type ProductionOrdersPermission = (typeof permissions)[keyof typeof permissions];
