export const permissions = {
  read: "analytics/kpis:read",
  create: "analytics/kpis:create",
  update: "analytics/kpis:update",
  submit: "analytics/kpis:submit",
  approve: "analytics/kpis:approve",
  reject: "analytics/kpis:reject",
  cancel: "analytics/kpis:cancel",
  close: "analytics/kpis:close",
  report: "analytics/kpis:report",
} as const;

export type KpisPermission = (typeof permissions)[keyof typeof permissions];
