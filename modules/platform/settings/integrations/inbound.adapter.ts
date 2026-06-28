export const settingsInboundAdapter = {
  name: "platform/settings.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/settings",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
