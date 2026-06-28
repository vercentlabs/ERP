export const supplierQuotationsOutboundAdapter = {
  name: "procurement/supplier-quotations.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/supplier-quotations",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
