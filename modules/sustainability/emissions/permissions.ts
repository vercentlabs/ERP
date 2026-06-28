export const permissions = {
  read: "sustainability/emissions:read",
  create: "sustainability/emissions:create",
  update: "sustainability/emissions:update",
  submit: "sustainability/emissions:submit",
  approve: "sustainability/emissions:approve",
  reject: "sustainability/emissions:reject",
  cancel: "sustainability/emissions:cancel",
  close: "sustainability/emissions:close",
  report: "sustainability/emissions:report",
} as const;

export type EmissionsPermission = (typeof permissions)[keyof typeof permissions];
