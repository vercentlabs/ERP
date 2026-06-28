export const supplierQualityOutboundAdapter = {
  name: "quality/supplier-quality.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/supplier-quality",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
