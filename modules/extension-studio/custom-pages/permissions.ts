export const permissions = {
  read: "extension-studio/custom-pages:read",
  create: "extension-studio/custom-pages:create",
  update: "extension-studio/custom-pages:update",
  submit: "extension-studio/custom-pages:submit",
  approve: "extension-studio/custom-pages:approve",
  reject: "extension-studio/custom-pages:reject",
  cancel: "extension-studio/custom-pages:cancel",
  close: "extension-studio/custom-pages:close",
  report: "extension-studio/custom-pages:report",
} as const;

export type CustomPagesPermission = (typeof permissions)[keyof typeof permissions];
