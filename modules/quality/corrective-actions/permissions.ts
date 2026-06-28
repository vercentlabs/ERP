export const permissions = {
  read: "quality/corrective-actions:read",
  create: "quality/corrective-actions:create",
  update: "quality/corrective-actions:update",
  submit: "quality/corrective-actions:submit",
  approve: "quality/corrective-actions:approve",
  reject: "quality/corrective-actions:reject",
  cancel: "quality/corrective-actions:cancel",
  close: "quality/corrective-actions:close",
  report: "quality/corrective-actions:report",
} as const;

export type CorrectiveActionsPermission = (typeof permissions)[keyof typeof permissions];
