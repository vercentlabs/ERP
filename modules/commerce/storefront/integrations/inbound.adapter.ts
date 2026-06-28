export const storefrontInboundAdapter = {
  name: "commerce/storefront.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "commerce/storefront",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
