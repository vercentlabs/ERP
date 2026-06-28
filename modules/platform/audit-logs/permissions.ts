export const permissions = {
  read: "platform/audit-logs:read",
  create: "platform/audit-logs:create",
  update: "platform/audit-logs:update",
  submit: "platform/audit-logs:submit",
  approve: "platform/audit-logs:approve",
  reject: "platform/audit-logs:reject",
  cancel: "platform/audit-logs:cancel",
  close: "platform/audit-logs:close",
  report: "platform/audit-logs:report",
} as const;

export type AuditLogsPermission = (typeof permissions)[keyof typeof permissions];
