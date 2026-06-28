export const servicePartsOutboundAdapter = {
  name: "field-service/service-parts.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "field-service/service-parts",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
