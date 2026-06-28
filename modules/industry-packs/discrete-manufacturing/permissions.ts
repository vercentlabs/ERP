export const permissions = {
  read: "industry-packs/discrete-manufacturing:read",
  create: "industry-packs/discrete-manufacturing:create",
  update: "industry-packs/discrete-manufacturing:update",
  submit: "industry-packs/discrete-manufacturing:submit",
  approve: "industry-packs/discrete-manufacturing:approve",
  reject: "industry-packs/discrete-manufacturing:reject",
  cancel: "industry-packs/discrete-manufacturing:cancel",
  close: "industry-packs/discrete-manufacturing:close",
  report: "industry-packs/discrete-manufacturing:report",
} as const;

export type DiscreteManufacturingPermission = (typeof permissions)[keyof typeof permissions];
