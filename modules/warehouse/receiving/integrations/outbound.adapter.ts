export const receivingOutboundAdapter = {
  name: "warehouse/receiving.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/receiving",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
