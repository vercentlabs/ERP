export const segregationOfDutiesWebhookAdapter = {
  name: "compliance/segregation-of-duties.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/segregation-of-duties",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
