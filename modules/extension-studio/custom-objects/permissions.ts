export const permissions = {
  read: "extension-studio/custom-objects:read",
  create: "extension-studio/custom-objects:create",
  update: "extension-studio/custom-objects:update",
  submit: "extension-studio/custom-objects:submit",
  approve: "extension-studio/custom-objects:approve",
  reject: "extension-studio/custom-objects:reject",
  cancel: "extension-studio/custom-objects:cancel",
  close: "extension-studio/custom-objects:close",
  report: "extension-studio/custom-objects:report",
} as const;

export type CustomObjectsPermission = (typeof permissions)[keyof typeof permissions];
