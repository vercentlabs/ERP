export const revenueRecognitionWebhookAdapter = {
  name: "subscriptions/revenue-recognition.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/revenue-recognition",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
