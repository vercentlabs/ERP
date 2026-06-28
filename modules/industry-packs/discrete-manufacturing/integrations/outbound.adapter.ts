export const discreteManufacturingOutboundAdapter = {
  name: "industry-packs/discrete-manufacturing.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/discrete-manufacturing",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
