export const inspectionPlansOutboundAdapter = {
  name: "quality/inspection-plans.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/inspection-plans",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
