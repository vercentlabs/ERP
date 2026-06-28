export const profitabilityInboundAdapter = {
  name: "projects/profitability.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "projects/profitability",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
