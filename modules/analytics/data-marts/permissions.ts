export const permissions = {
  read: "analytics/data-marts:read",
  create: "analytics/data-marts:create",
  update: "analytics/data-marts:update",
  submit: "analytics/data-marts:submit",
  approve: "analytics/data-marts:approve",
  reject: "analytics/data-marts:reject",
  cancel: "analytics/data-marts:cancel",
  close: "analytics/data-marts:close",
  report: "analytics/data-marts:report",
} as const;

export type DataMartsPermission = (typeof permissions)[keyof typeof permissions];
