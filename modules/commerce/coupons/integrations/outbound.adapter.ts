export const couponsOutboundAdapter = {
  name: "commerce/coupons.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "commerce/coupons",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
