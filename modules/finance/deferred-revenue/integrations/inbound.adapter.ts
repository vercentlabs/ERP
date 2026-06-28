export const deferredRevenueInboundAdapter = {
  name: "finance/deferred-revenue.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/deferred-revenue",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
