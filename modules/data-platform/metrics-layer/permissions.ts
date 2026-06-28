export const permissions = {
  read: "data-platform/metrics-layer:read",
  create: "data-platform/metrics-layer:create",
  update: "data-platform/metrics-layer:update",
  submit: "data-platform/metrics-layer:submit",
  approve: "data-platform/metrics-layer:approve",
  reject: "data-platform/metrics-layer:reject",
  cancel: "data-platform/metrics-layer:cancel",
  close: "data-platform/metrics-layer:close",
  report: "data-platform/metrics-layer:report",
} as const;

export type MetricsLayerPermission = (typeof permissions)[keyof typeof permissions];
