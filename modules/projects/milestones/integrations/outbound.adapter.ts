export const milestonesOutboundAdapter = {
  name: "projects/milestones.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "projects/milestones",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
