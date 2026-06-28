export const metricsLayerOutboundAdapter = {
  name: "data-platform/metrics-layer.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/metrics-layer",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
