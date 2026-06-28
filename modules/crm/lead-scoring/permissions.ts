export const permissions = {
  read: "crm/lead-scoring:read",
  create: "crm/lead-scoring:create",
  update: "crm/lead-scoring:update",
  submit: "crm/lead-scoring:submit",
  approve: "crm/lead-scoring:approve",
  reject: "crm/lead-scoring:reject",
  cancel: "crm/lead-scoring:cancel",
  close: "crm/lead-scoring:close",
  report: "crm/lead-scoring:report",
} as const;

export type LeadScoringPermission = (typeof permissions)[keyof typeof permissions];
