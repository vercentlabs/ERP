export const supplierQualityInboundAdapter = {
  name: "quality/supplier-quality.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/supplier-quality",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
