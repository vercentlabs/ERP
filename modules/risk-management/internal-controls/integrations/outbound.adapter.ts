export const internalControlsOutboundAdapter = {
  name: "risk-management/internal-controls.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "risk-management/internal-controls",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
