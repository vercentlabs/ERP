export const anomalyDetectionWebhookAdapter = {
  name: "ai/anomaly-detection.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/anomaly-detection",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
