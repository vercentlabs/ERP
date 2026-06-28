export const semanticLayerInboundAdapter = {
  name: "data-platform/semantic-layer.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/semantic-layer",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
