export const permissions = {
  read: "manufacturing/subcontracting:read",
  create: "manufacturing/subcontracting:create",
  update: "manufacturing/subcontracting:update",
  submit: "manufacturing/subcontracting:submit",
  approve: "manufacturing/subcontracting:approve",
  reject: "manufacturing/subcontracting:reject",
  cancel: "manufacturing/subcontracting:cancel",
  close: "manufacturing/subcontracting:close",
  report: "manufacturing/subcontracting:report",
} as const;

export type SubcontractingPermission = (typeof permissions)[keyof typeof permissions];
