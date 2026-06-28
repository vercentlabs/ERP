export const dunningOutboundAdapter = {
  name: "subscriptions/dunning.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/dunning",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
