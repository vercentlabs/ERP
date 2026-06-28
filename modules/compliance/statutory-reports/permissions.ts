export const permissions = {
  read: "compliance/statutory-reports:read",
  create: "compliance/statutory-reports:create",
  update: "compliance/statutory-reports:update",
  submit: "compliance/statutory-reports:submit",
  approve: "compliance/statutory-reports:approve",
  reject: "compliance/statutory-reports:reject",
  cancel: "compliance/statutory-reports:cancel",
  close: "compliance/statutory-reports:close",
  report: "compliance/statutory-reports:report",
} as const;

export type StatutoryReportsPermission = (typeof permissions)[keyof typeof permissions];
