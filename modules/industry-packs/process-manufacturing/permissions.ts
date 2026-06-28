export const permissions = {
  read: "industry-packs/process-manufacturing:read",
  create: "industry-packs/process-manufacturing:create",
  update: "industry-packs/process-manufacturing:update",
  submit: "industry-packs/process-manufacturing:submit",
  approve: "industry-packs/process-manufacturing:approve",
  reject: "industry-packs/process-manufacturing:reject",
  cancel: "industry-packs/process-manufacturing:cancel",
  close: "industry-packs/process-manufacturing:close",
  report: "industry-packs/process-manufacturing:report",
} as const;

export type ProcessManufacturingPermission = (typeof permissions)[keyof typeof permissions];
