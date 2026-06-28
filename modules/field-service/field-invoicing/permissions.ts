export const permissions = {
  read: "field-service/field-invoicing:read",
  create: "field-service/field-invoicing:create",
  update: "field-service/field-invoicing:update",
  submit: "field-service/field-invoicing:submit",
  approve: "field-service/field-invoicing:approve",
  reject: "field-service/field-invoicing:reject",
  cancel: "field-service/field-invoicing:cancel",
  close: "field-service/field-invoicing:close",
  report: "field-service/field-invoicing:report",
} as const;

export type FieldInvoicingPermission = (typeof permissions)[keyof typeof permissions];
