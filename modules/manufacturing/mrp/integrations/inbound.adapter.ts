export const mrpInboundAdapter = {
  name: "manufacturing/mrp.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/mrp",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
