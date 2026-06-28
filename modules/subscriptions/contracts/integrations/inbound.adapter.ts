export const contractsInboundAdapter = {
  name: "subscriptions/contracts.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/contracts",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
