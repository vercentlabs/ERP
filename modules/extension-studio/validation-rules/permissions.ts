export const permissions = {
  read: "extension-studio/validation-rules:read",
  create: "extension-studio/validation-rules:create",
  update: "extension-studio/validation-rules:update",
  submit: "extension-studio/validation-rules:submit",
  approve: "extension-studio/validation-rules:approve",
  reject: "extension-studio/validation-rules:reject",
  cancel: "extension-studio/validation-rules:cancel",
  close: "extension-studio/validation-rules:close",
  report: "extension-studio/validation-rules:report",
} as const;

export type ValidationRulesPermission = (typeof permissions)[keyof typeof permissions];
