export const incidentsInboundAdapter = {
  name: "risk-management/incidents.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "risk-management/incidents",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
