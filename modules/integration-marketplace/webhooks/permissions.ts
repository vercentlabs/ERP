export const permissions = {
  read: "integration-marketplace/webhooks:read",
  create: "integration-marketplace/webhooks:create",
  update: "integration-marketplace/webhooks:update",
  submit: "integration-marketplace/webhooks:submit",
  approve: "integration-marketplace/webhooks:approve",
  reject: "integration-marketplace/webhooks:reject",
  cancel: "integration-marketplace/webhooks:cancel",
  close: "integration-marketplace/webhooks:close",
  report: "integration-marketplace/webhooks:report",
} as const;

export type WebhooksPermission = (typeof permissions)[keyof typeof permissions];
