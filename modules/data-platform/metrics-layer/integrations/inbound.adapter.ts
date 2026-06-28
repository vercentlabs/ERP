export const metricsLayerInboundAdapter = {
  name: "data-platform/metrics-layer.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/metrics-layer",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
