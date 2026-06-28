export const routingsOutboundAdapter = {
  name: "manufacturing/routings.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/routings",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
