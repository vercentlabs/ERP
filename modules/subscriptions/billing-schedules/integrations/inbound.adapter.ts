export const billingSchedulesInboundAdapter = {
  name: "subscriptions/billing-schedules.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/billing-schedules",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
