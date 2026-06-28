export const certificationsInboundAdapter = {
  name: "compliance/certifications.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/certifications",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
