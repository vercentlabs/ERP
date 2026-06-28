export const routePlanningInboundAdapter = {
  name: "field-service/route-planning.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "field-service/route-planning",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
