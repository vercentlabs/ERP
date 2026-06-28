export const customerQualityOutboundAdapter = {
  name: "quality/customer-quality.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/customer-quality",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
