export const permissions = {
  read: "platform/companies:read",
  create: "platform/companies:create",
  update: "platform/companies:update",
  submit: "platform/companies:submit",
  approve: "platform/companies:approve",
  reject: "platform/companies:reject",
  cancel: "platform/companies:cancel",
  close: "platform/companies:close",
  report: "platform/companies:report",
} as const;

export type CompaniesPermission = (typeof permissions)[keyof typeof permissions];
