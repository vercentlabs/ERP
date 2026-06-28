export const customerQualityInboundAdapter = {
  name: "quality/customer-quality.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/customer-quality",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
