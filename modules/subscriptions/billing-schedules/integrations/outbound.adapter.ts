export const billingSchedulesOutboundAdapter = {
  name: "subscriptions/billing-schedules.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/billing-schedules",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
