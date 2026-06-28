export const costCentersInboundAdapter = {
  name: "finance/cost-centers.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/cost-centers",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
