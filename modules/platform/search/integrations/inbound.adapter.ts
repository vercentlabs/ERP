export const searchInboundAdapter = {
  name: "platform/search.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/search",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
