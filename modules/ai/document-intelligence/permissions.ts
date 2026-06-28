export const permissions = {
  read: "ai/document-intelligence:read",
  create: "ai/document-intelligence:create",
  update: "ai/document-intelligence:update",
  submit: "ai/document-intelligence:submit",
  approve: "ai/document-intelligence:approve",
  reject: "ai/document-intelligence:reject",
  cancel: "ai/document-intelligence:cancel",
  close: "ai/document-intelligence:close",
  report: "ai/document-intelligence:report",
} as const;

export type DocumentIntelligencePermission = (typeof permissions)[keyof typeof permissions];
