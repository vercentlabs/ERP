export const threeWayMatchInboundAdapter = {
  name: "procurement/three-way-match.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/three-way-match",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
