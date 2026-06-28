export const assetPerformanceInboundAdapter = {
  name: "maintenance/asset-performance.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/asset-performance",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
