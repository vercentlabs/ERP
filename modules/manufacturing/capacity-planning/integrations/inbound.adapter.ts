export const capacityPlanningInboundAdapter = {
  name: "manufacturing/capacity-planning.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/capacity-planning",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
