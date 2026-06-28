export const permissions = {
  read: "field-service/service-parts:read",
  create: "field-service/service-parts:create",
  update: "field-service/service-parts:update",
  submit: "field-service/service-parts:submit",
  approve: "field-service/service-parts:approve",
  reject: "field-service/service-parts:reject",
  cancel: "field-service/service-parts:cancel",
  close: "field-service/service-parts:close",
  report: "field-service/service-parts:report",
} as const;

export type ServicePartsPermission = (typeof permissions)[keyof typeof permissions];
