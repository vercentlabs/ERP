export const boardPacksOutboundAdapter = {
  name: "enterprise-performance/board-packs.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/board-packs",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
