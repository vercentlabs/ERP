export const contractsOutboundAdapter = {
  name: "subscriptions/contracts.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/contracts",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
