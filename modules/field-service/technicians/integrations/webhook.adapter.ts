export const techniciansWebhookAdapter = {
  name: "field-service/technicians.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "field-service/technicians",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
