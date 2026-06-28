export const permissions = {
  read: "ai/anomaly-detection:read",
  create: "ai/anomaly-detection:create",
  update: "ai/anomaly-detection:update",
  submit: "ai/anomaly-detection:submit",
  approve: "ai/anomaly-detection:approve",
  reject: "ai/anomaly-detection:reject",
  cancel: "ai/anomaly-detection:cancel",
  close: "ai/anomaly-detection:close",
  report: "ai/anomaly-detection:report",
} as const;

export type AnomalyDetectionPermission = (typeof permissions)[keyof typeof permissions];
