export const permissions = {
  read: "integration-marketplace/oauth-connections:read",
  create: "integration-marketplace/oauth-connections:create",
  update: "integration-marketplace/oauth-connections:update",
  submit: "integration-marketplace/oauth-connections:submit",
  approve: "integration-marketplace/oauth-connections:approve",
  reject: "integration-marketplace/oauth-connections:reject",
  cancel: "integration-marketplace/oauth-connections:cancel",
  close: "integration-marketplace/oauth-connections:close",
  report: "integration-marketplace/oauth-connections:report",
} as const;

export type OauthConnectionsPermission = (typeof permissions)[keyof typeof permissions];
