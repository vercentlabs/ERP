export const energyUsageOutboundAdapter = {
  name: "sustainability/energy-usage.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/energy-usage",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
