export const plansInboundAdapter = {
  name: "subscriptions/plans.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/plans",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
