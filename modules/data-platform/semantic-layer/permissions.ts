export const permissions = {
  read: "data-platform/semantic-layer:read",
  create: "data-platform/semantic-layer:create",
  update: "data-platform/semantic-layer:update",
  submit: "data-platform/semantic-layer:submit",
  approve: "data-platform/semantic-layer:approve",
  reject: "data-platform/semantic-layer:reject",
  cancel: "data-platform/semantic-layer:cancel",
  close: "data-platform/semantic-layer:close",
  report: "data-platform/semantic-layer:report",
} as const;

export type SemanticLayerPermission = (typeof permissions)[keyof typeof permissions];
