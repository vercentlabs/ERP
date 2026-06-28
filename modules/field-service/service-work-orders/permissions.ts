export const permissions = {
  read: "field-service/service-work-orders:read",
  create: "field-service/service-work-orders:create",
  update: "field-service/service-work-orders:update",
  submit: "field-service/service-work-orders:submit",
  approve: "field-service/service-work-orders:approve",
  reject: "field-service/service-work-orders:reject",
  cancel: "field-service/service-work-orders:cancel",
  close: "field-service/service-work-orders:close",
  report: "field-service/service-work-orders:report",
} as const;

export type ServiceWorkOrdersPermission = (typeof permissions)[keyof typeof permissions];
