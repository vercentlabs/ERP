export const serviceWorkOrdersOutboundAdapter = {
  name: "field-service/service-work-orders.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "field-service/service-work-orders",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
