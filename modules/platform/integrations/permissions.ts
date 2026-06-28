export const permissions = {
  read: "platform/integrations:read",
  create: "platform/integrations:create",
  update: "platform/integrations:update",
  submit: "platform/integrations:submit",
  approve: "platform/integrations:approve",
  reject: "platform/integrations:reject",
  cancel: "platform/integrations:cancel",
  close: "platform/integrations:close",
  report: "platform/integrations:report",
} as const;

export type IntegrationsPermission = (typeof permissions)[keyof typeof permissions];
