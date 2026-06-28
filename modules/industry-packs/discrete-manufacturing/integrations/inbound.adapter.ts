export const discreteManufacturingInboundAdapter = {
  name: "industry-packs/discrete-manufacturing.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/discrete-manufacturing",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
