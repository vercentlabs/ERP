export const replenishmentTasksWebhookAdapter = {
  name: "warehouse/replenishment-tasks.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/replenishment-tasks",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
