export const permissions = {
  read: "sustainability/carbon-accounting:read",
  create: "sustainability/carbon-accounting:create",
  update: "sustainability/carbon-accounting:update",
  submit: "sustainability/carbon-accounting:submit",
  approve: "sustainability/carbon-accounting:approve",
  reject: "sustainability/carbon-accounting:reject",
  cancel: "sustainability/carbon-accounting:cancel",
  close: "sustainability/carbon-accounting:close",
  report: "sustainability/carbon-accounting:report",
} as const;

export type CarbonAccountingPermission = (typeof permissions)[keyof typeof permissions];
