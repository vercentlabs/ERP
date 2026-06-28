export const processManufacturingOutboundAdapter = {
  name: "industry-packs/process-manufacturing.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/process-manufacturing",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
