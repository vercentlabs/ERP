export const channelSyncInboundAdapter = {
  name: "commerce/channel-sync.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "commerce/channel-sync",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
