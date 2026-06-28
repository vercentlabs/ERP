export const supplierSustainabilityInboundAdapter = {
  name: "sustainability/supplier-sustainability.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/supplier-sustainability",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
