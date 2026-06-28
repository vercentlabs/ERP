export const assetPerformanceOutboundAdapter = {
  name: "maintenance/asset-performance.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/asset-performance",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
