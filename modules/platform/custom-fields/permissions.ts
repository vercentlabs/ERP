export const permissions = {
  read: "platform/custom-fields:read",
  create: "platform/custom-fields:create",
  update: "platform/custom-fields:update",
  submit: "platform/custom-fields:submit",
  approve: "platform/custom-fields:approve",
  reject: "platform/custom-fields:reject",
  cancel: "platform/custom-fields:cancel",
  close: "platform/custom-fields:close",
  report: "platform/custom-fields:report",
} as const;

export type CustomFieldsPermission = (typeof permissions)[keyof typeof permissions];
