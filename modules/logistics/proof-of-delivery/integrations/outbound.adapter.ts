export const proofOfDeliveryOutboundAdapter = {
  name: "logistics/proof-of-delivery.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "logistics/proof-of-delivery",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
