export const controlsOutboundAdapter = {
  name: "compliance/controls.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/controls",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
