export const purchaseContractsOutboundAdapter = {
  name: "procurement/purchase-contracts.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/purchase-contracts",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
