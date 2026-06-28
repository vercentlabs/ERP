export const supplierQuotationsInboundAdapter = {
  name: "procurement/supplier-quotations.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/supplier-quotations",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
