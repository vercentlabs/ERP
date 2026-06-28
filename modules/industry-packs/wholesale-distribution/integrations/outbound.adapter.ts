export const wholesaleDistributionOutboundAdapter = {
  name: "industry-packs/wholesale-distribution.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/wholesale-distribution",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
