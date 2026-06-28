export const revenueRecognitionWebhookAdapter = {
  name: "finance/revenue-recognition.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/revenue-recognition",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
