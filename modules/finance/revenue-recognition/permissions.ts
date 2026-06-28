export const permissions = {
  read: "finance/revenue-recognition:read",
  create: "finance/revenue-recognition:create",
  update: "finance/revenue-recognition:update",
  submit: "finance/revenue-recognition:submit",
  approve: "finance/revenue-recognition:approve",
  reject: "finance/revenue-recognition:reject",
  cancel: "finance/revenue-recognition:cancel",
  close: "finance/revenue-recognition:close",
  report: "finance/revenue-recognition:report",
} as const;

export type RevenueRecognitionPermission = (typeof permissions)[keyof typeof permissions];
