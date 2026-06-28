export const bankReconciliationInboundAdapter = {
  name: "finance/bank-reconciliation.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/bank-reconciliation",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
