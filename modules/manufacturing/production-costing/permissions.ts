export const permissions = {
  read: "manufacturing/production-costing:read",
  create: "manufacturing/production-costing:create",
  update: "manufacturing/production-costing:update",
  submit: "manufacturing/production-costing:submit",
  approve: "manufacturing/production-costing:approve",
  reject: "manufacturing/production-costing:reject",
  cancel: "manufacturing/production-costing:cancel",
  close: "manufacturing/production-costing:close",
  report: "manufacturing/production-costing:report",
} as const;

export type ProductionCostingPermission = (typeof permissions)[keyof typeof permissions];
