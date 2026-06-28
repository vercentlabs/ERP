export const assetPerformanceWebhookAdapter = {
  name: "maintenance/asset-performance.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/asset-performance",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
