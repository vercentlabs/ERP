export const auditLogsWebhookAdapter = {
  name: "platform/audit-logs.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/audit-logs",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
