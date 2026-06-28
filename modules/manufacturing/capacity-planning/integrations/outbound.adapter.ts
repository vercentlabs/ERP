export const capacityPlanningOutboundAdapter = {
  name: "manufacturing/capacity-planning.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/capacity-planning",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
