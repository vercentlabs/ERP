export const permissions = {
  read: "helpdesk/knowledge-base:read",
  create: "helpdesk/knowledge-base:create",
  update: "helpdesk/knowledge-base:update",
  submit: "helpdesk/knowledge-base:submit",
  approve: "helpdesk/knowledge-base:approve",
  reject: "helpdesk/knowledge-base:reject",
  cancel: "helpdesk/knowledge-base:cancel",
  close: "helpdesk/knowledge-base:close",
  report: "helpdesk/knowledge-base:report",
} as const;

export type KnowledgeBasePermission = (typeof permissions)[keyof typeof permissions];
