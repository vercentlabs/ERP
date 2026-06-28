export const permissions = {
  read: "sustainability/sustainability-reports:read",
  create: "sustainability/sustainability-reports:create",
  update: "sustainability/sustainability-reports:update",
  submit: "sustainability/sustainability-reports:submit",
  approve: "sustainability/sustainability-reports:approve",
  reject: "sustainability/sustainability-reports:reject",
  cancel: "sustainability/sustainability-reports:cancel",
  close: "sustainability/sustainability-reports:close",
  report: "sustainability/sustainability-reports:report",
} as const;

export type SustainabilityReportsPermission = (typeof permissions)[keyof typeof permissions];
