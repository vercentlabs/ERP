export const incidentsOutboundAdapter = {
  name: "risk-management/incidents.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "risk-management/incidents",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
