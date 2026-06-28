export const permissions = {
  read: "subscriptions/revenue-recognition:read",
  create: "subscriptions/revenue-recognition:create",
  update: "subscriptions/revenue-recognition:update",
  submit: "subscriptions/revenue-recognition:submit",
  approve: "subscriptions/revenue-recognition:approve",
  reject: "subscriptions/revenue-recognition:reject",
  cancel: "subscriptions/revenue-recognition:cancel",
  close: "subscriptions/revenue-recognition:close",
  report: "subscriptions/revenue-recognition:report",
} as const;

export type RevenueRecognitionPermission = (typeof permissions)[keyof typeof permissions];
