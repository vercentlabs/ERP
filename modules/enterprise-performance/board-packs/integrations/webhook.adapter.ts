export const boardPacksWebhookAdapter = {
  name: "enterprise-performance/board-packs.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/board-packs",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
