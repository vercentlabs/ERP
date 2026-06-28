export const proofOfDeliveryInboundAdapter = {
  name: "logistics/proof-of-delivery.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "logistics/proof-of-delivery",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
