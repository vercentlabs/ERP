export const permissions = {
  read: "procurement/procurement-policies:read",
  create: "procurement/procurement-policies:create",
  update: "procurement/procurement-policies:update",
  submit: "procurement/procurement-policies:submit",
  approve: "procurement/procurement-policies:approve",
  reject: "procurement/procurement-policies:reject",
  cancel: "procurement/procurement-policies:cancel",
  close: "procurement/procurement-policies:close",
  report: "procurement/procurement-policies:report",
} as const;

export type ProcurementPoliciesPermission = (typeof permissions)[keyof typeof permissions];
