export const permissions = {
  read: "procurement/rfqs:read",
  create: "procurement/rfqs:create",
  update: "procurement/rfqs:update",
  submit: "procurement/rfqs:submit",
  approve: "procurement/rfqs:approve",
  reject: "procurement/rfqs:reject",
  cancel: "procurement/rfqs:cancel",
  close: "procurement/rfqs:close",
  report: "procurement/rfqs:report",
} as const;

export type RfqsPermission = (typeof permissions)[keyof typeof permissions];
