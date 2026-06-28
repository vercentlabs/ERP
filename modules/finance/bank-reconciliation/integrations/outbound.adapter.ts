export const bankReconciliationOutboundAdapter = {
  name: "finance/bank-reconciliation.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/bank-reconciliation",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
