export const storefrontOutboundAdapter = {
  name: "commerce/storefront.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "commerce/storefront",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
