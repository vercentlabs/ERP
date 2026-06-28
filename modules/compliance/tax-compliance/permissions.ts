export const permissions = {
  read: "compliance/tax-compliance:read",
  create: "compliance/tax-compliance:create",
  update: "compliance/tax-compliance:update",
  submit: "compliance/tax-compliance:submit",
  approve: "compliance/tax-compliance:approve",
  reject: "compliance/tax-compliance:reject",
  cancel: "compliance/tax-compliance:cancel",
  close: "compliance/tax-compliance:close",
  report: "compliance/tax-compliance:report",
} as const;

export type TaxCompliancePermission = (typeof permissions)[keyof typeof permissions];
