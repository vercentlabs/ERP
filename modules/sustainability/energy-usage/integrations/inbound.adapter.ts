export const energyUsageInboundAdapter = {
  name: "sustainability/energy-usage.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/energy-usage",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
