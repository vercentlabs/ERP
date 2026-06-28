export const mitigationsOutboundAdapter = {
  name: "risk-management/mitigations.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "risk-management/mitigations",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
