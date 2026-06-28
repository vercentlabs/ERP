export const permissions = {
  read: "field-service/technicians:read",
  create: "field-service/technicians:create",
  update: "field-service/technicians:update",
  submit: "field-service/technicians:submit",
  approve: "field-service/technicians:approve",
  reject: "field-service/technicians:reject",
  cancel: "field-service/technicians:cancel",
  close: "field-service/technicians:close",
  report: "field-service/technicians:report",
} as const;

export type TechniciansPermission = (typeof permissions)[keyof typeof permissions];
