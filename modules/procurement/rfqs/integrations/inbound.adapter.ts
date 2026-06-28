export const rfqsInboundAdapter = {
  name: "procurement/rfqs.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/rfqs",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
