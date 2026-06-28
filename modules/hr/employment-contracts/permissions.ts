export const permissions = {
  read: "hr/employment-contracts:read",
  create: "hr/employment-contracts:create",
  update: "hr/employment-contracts:update",
  submit: "hr/employment-contracts:submit",
  approve: "hr/employment-contracts:approve",
  reject: "hr/employment-contracts:reject",
  cancel: "hr/employment-contracts:cancel",
  close: "hr/employment-contracts:close",
  report: "hr/employment-contracts:report",
} as const;

export type EmploymentContractsPermission = (typeof permissions)[keyof typeof permissions];
