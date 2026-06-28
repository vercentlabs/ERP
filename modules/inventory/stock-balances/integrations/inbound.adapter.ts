export const stockBalancesInboundAdapter = {
  name: "inventory/stock-balances.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/stock-balances",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
