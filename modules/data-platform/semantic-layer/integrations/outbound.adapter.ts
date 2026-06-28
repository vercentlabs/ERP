export const semanticLayerOutboundAdapter = {
  name: "data-platform/semantic-layer.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/semantic-layer",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
