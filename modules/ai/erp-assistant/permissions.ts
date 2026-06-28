export const permissions = {
  read: "ai/erp-assistant:read",
  create: "ai/erp-assistant:create",
  update: "ai/erp-assistant:update",
  submit: "ai/erp-assistant:submit",
  approve: "ai/erp-assistant:approve",
  reject: "ai/erp-assistant:reject",
  cancel: "ai/erp-assistant:cancel",
  close: "ai/erp-assistant:close",
  report: "ai/erp-assistant:report",
} as const;

export type ErpAssistantPermission = (typeof permissions)[keyof typeof permissions];
