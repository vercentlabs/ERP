export const permissions = {
  read: "extension-studio/app-builder:read",
  create: "extension-studio/app-builder:create",
  update: "extension-studio/app-builder:update",
  submit: "extension-studio/app-builder:submit",
  approve: "extension-studio/app-builder:approve",
  reject: "extension-studio/app-builder:reject",
  cancel: "extension-studio/app-builder:cancel",
  close: "extension-studio/app-builder:close",
  report: "extension-studio/app-builder:report",
} as const;

export type AppBuilderPermission = (typeof permissions)[keyof typeof permissions];
