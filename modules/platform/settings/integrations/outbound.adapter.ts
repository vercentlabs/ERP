export const settingsOutboundAdapter = {
  name: "platform/settings.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/settings",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
