export const permissions = {
  read: "crm/activities:read",
  create: "crm/activities:create",
  update: "crm/activities:update",
  submit: "crm/activities:submit",
  approve: "crm/activities:approve",
  reject: "crm/activities:reject",
  cancel: "crm/activities:cancel",
  close: "crm/activities:close",
  report: "crm/activities:report",
} as const;

export type ActivitiesPermission = (typeof permissions)[keyof typeof permissions];
