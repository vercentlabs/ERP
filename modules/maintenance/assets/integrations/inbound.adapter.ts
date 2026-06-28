export const assetsInboundAdapter = {
  name: "maintenance/assets.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/assets",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
