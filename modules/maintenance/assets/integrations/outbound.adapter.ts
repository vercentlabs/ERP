export const assetsOutboundAdapter = {
  name: "maintenance/assets.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/assets",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
