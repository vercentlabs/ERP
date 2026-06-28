export const permissions = {
  read: "crm/segments:read",
  create: "crm/segments:create",
  update: "crm/segments:update",
  submit: "crm/segments:submit",
  approve: "crm/segments:approve",
  reject: "crm/segments:reject",
  cancel: "crm/segments:cancel",
  close: "crm/segments:close",
  report: "crm/segments:report",
} as const;

export type SegmentsPermission = (typeof permissions)[keyof typeof permissions];
