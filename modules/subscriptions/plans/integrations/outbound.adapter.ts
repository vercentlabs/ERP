export const plansOutboundAdapter = {
  name: "subscriptions/plans.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/plans",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
