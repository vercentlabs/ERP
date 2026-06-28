export const permissions = {
  read: "extension-studio/formula-fields:read",
  create: "extension-studio/formula-fields:create",
  update: "extension-studio/formula-fields:update",
  submit: "extension-studio/formula-fields:submit",
  approve: "extension-studio/formula-fields:approve",
  reject: "extension-studio/formula-fields:reject",
  cancel: "extension-studio/formula-fields:cancel",
  close: "extension-studio/formula-fields:close",
  report: "extension-studio/formula-fields:report",
} as const;

export type FormulaFieldsPermission = (typeof permissions)[keyof typeof permissions];
