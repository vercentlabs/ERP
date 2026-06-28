export const permissions = {
  read: "crm/campaigns:read",
  create: "crm/campaigns:create",
  update: "crm/campaigns:update",
  submit: "crm/campaigns:submit",
  approve: "crm/campaigns:approve",
  reject: "crm/campaigns:reject",
  cancel: "crm/campaigns:cancel",
  close: "crm/campaigns:close",
  report: "crm/campaigns:report",
} as const;

export type CampaignsPermission = (typeof permissions)[keyof typeof permissions];
