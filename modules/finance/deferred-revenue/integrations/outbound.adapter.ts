export const deferredRevenueOutboundAdapter = {
  name: "finance/deferred-revenue.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/deferred-revenue",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
