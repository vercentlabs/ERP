export const boardPacksInboundAdapter = {
  name: "enterprise-performance/board-packs.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/board-packs",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
