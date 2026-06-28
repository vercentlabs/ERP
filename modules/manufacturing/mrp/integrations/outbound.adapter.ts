export const mrpOutboundAdapter = {
  name: "manufacturing/mrp.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/mrp",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
