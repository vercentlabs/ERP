export const permissions = {
  read: "risk-management/incidents:read",
  create: "risk-management/incidents:create",
  update: "risk-management/incidents:update",
  submit: "risk-management/incidents:submit",
  approve: "risk-management/incidents:approve",
  reject: "risk-management/incidents:reject",
  cancel: "risk-management/incidents:cancel",
  close: "risk-management/incidents:close",
  report: "risk-management/incidents:report",
} as const;

export type IncidentsPermission = (typeof permissions)[keyof typeof permissions];
