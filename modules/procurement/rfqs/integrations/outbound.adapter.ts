export const rfqsOutboundAdapter = {
  name: "procurement/rfqs.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/rfqs",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
