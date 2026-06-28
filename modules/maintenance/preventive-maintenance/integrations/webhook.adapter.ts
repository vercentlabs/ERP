export const preventiveMaintenanceWebhookAdapter = {
  name: "maintenance/preventive-maintenance.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/preventive-maintenance",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
