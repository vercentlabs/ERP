export const quotationsInboundAdapter = {
  name: "sales/quotations.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sales/quotations",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
