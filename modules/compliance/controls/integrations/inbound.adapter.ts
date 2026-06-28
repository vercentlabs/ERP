export const controlsInboundAdapter = {
  name: "compliance/controls.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/controls",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
