export const attendanceWebhookAdapter = {
  name: "hr/attendance.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "hr/attendance",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
