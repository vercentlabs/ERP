export const vendorBillsOutboundAdapter = {
  name: "procurement/vendor-bills.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/vendor-bills",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
