export const wholesaleDistributionInboundAdapter = {
  name: "industry-packs/wholesale-distribution.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/wholesale-distribution",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
