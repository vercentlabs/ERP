export const invoicesInboundAdapter = {
  name: "sales/invoices.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sales/invoices",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
