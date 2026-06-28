export const internalControlsInboundAdapter = {
  name: "risk-management/internal-controls.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "risk-management/internal-controls",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
