export const permissions = {
  read: "inventory/units-of-measure:read",
  create: "inventory/units-of-measure:create",
  update: "inventory/units-of-measure:update",
  submit: "inventory/units-of-measure:submit",
  approve: "inventory/units-of-measure:approve",
  reject: "inventory/units-of-measure:reject",
  cancel: "inventory/units-of-measure:cancel",
  close: "inventory/units-of-measure:close",
  report: "inventory/units-of-measure:report",
} as const;

export type UnitsOfMeasurePermission = (typeof permissions)[keyof typeof permissions];
