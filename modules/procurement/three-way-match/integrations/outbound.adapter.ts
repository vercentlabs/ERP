export const threeWayMatchOutboundAdapter = {
  name: "procurement/three-way-match.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/three-way-match",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
