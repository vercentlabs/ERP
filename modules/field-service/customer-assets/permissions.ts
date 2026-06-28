export const permissions = {
  read: "field-service/customer-assets:read",
  create: "field-service/customer-assets:create",
  update: "field-service/customer-assets:update",
  submit: "field-service/customer-assets:submit",
  approve: "field-service/customer-assets:approve",
  reject: "field-service/customer-assets:reject",
  cancel: "field-service/customer-assets:cancel",
  close: "field-service/customer-assets:close",
  report: "field-service/customer-assets:report",
} as const;

export type CustomerAssetsPermission = (typeof permissions)[keyof typeof permissions];
