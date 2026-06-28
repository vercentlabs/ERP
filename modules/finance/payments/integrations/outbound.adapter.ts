export const paymentsOutboundAdapter = {
  name: "finance/payments.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/payments",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
