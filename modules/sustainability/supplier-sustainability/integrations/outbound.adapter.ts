export const supplierSustainabilityOutboundAdapter = {
  name: "sustainability/supplier-sustainability.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/supplier-sustainability",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
