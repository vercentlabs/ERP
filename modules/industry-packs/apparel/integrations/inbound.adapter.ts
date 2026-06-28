export const apparelInboundAdapter = {
  name: "industry-packs/apparel.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/apparel",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
