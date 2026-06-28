export const webhooksInboundAdapter = {
  name: "integration-marketplace/webhooks.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/webhooks",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
