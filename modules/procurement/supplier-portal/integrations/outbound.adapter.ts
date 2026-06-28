export const supplierPortalOutboundAdapter = {
  name: "procurement/supplier-portal.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/supplier-portal",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
