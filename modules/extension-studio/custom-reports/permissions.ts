export const permissions = {
  read: "extension-studio/custom-reports:read",
  create: "extension-studio/custom-reports:create",
  update: "extension-studio/custom-reports:update",
  submit: "extension-studio/custom-reports:submit",
  approve: "extension-studio/custom-reports:approve",
  reject: "extension-studio/custom-reports:reject",
  cancel: "extension-studio/custom-reports:cancel",
  close: "extension-studio/custom-reports:close",
  report: "extension-studio/custom-reports:report",
} as const;

export type CustomReportsPermission = (typeof permissions)[keyof typeof permissions];
