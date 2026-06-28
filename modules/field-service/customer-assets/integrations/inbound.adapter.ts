export const customerAssetsInboundAdapter = {
  name: "field-service/customer-assets.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "field-service/customer-assets",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
