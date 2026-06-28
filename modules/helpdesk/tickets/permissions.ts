export const permissions = {
  read: "helpdesk/tickets:read",
  create: "helpdesk/tickets:create",
  update: "helpdesk/tickets:update",
  submit: "helpdesk/tickets:submit",
  approve: "helpdesk/tickets:approve",
  reject: "helpdesk/tickets:reject",
  cancel: "helpdesk/tickets:cancel",
  close: "helpdesk/tickets:close",
  report: "helpdesk/tickets:report",
} as const;

export type TicketsPermission = (typeof permissions)[keyof typeof permissions];
