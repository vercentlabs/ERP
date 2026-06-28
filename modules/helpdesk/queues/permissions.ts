export const permissions = {
  read: "helpdesk/queues:read",
  create: "helpdesk/queues:create",
  update: "helpdesk/queues:update",
  submit: "helpdesk/queues:submit",
  approve: "helpdesk/queues:approve",
  reject: "helpdesk/queues:reject",
  cancel: "helpdesk/queues:cancel",
  close: "helpdesk/queues:close",
  report: "helpdesk/queues:report",
} as const;

export type QueuesPermission = (typeof permissions)[keyof typeof permissions];
