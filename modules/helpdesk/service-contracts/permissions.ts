export const permissions = {
  read: "helpdesk/service-contracts:read",
  create: "helpdesk/service-contracts:create",
  update: "helpdesk/service-contracts:update",
  submit: "helpdesk/service-contracts:submit",
  approve: "helpdesk/service-contracts:approve",
  reject: "helpdesk/service-contracts:reject",
  cancel: "helpdesk/service-contracts:cancel",
  close: "helpdesk/service-contracts:close",
  report: "helpdesk/service-contracts:report",
} as const;

export type ServiceContractsPermission = (typeof permissions)[keyof typeof permissions];
