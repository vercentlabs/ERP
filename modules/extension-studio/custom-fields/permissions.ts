export const permissions = {
  read: "extension-studio/custom-fields:read",
  create: "extension-studio/custom-fields:create",
  update: "extension-studio/custom-fields:update",
  submit: "extension-studio/custom-fields:submit",
  approve: "extension-studio/custom-fields:approve",
  reject: "extension-studio/custom-fields:reject",
  cancel: "extension-studio/custom-fields:cancel",
  close: "extension-studio/custom-fields:close",
  report: "extension-studio/custom-fields:report",
} as const;

export type CustomFieldsPermission = (typeof permissions)[keyof typeof permissions];
