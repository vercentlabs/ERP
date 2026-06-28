export const equipmentWebhookAdapter = {
  name: "maintenance/equipment.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/equipment",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
