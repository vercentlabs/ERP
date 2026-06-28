export const permissions = {
  read: "compliance/approvals-audit:read",
  create: "compliance/approvals-audit:create",
  update: "compliance/approvals-audit:update",
  submit: "compliance/approvals-audit:submit",
  approve: "compliance/approvals-audit:approve",
  reject: "compliance/approvals-audit:reject",
  cancel: "compliance/approvals-audit:cancel",
  close: "compliance/approvals-audit:close",
  report: "compliance/approvals-audit:report",
} as const;

export type ApprovalsAuditPermission = (typeof permissions)[keyof typeof permissions];
