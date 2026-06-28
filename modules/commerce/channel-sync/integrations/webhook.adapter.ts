export const channelSyncWebhookAdapter = {
  name: "commerce/channel-sync.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "commerce/channel-sync",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
