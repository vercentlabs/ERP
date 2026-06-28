export const fixedAssetsOutboundAdapter = {
  name: "finance/fixed-assets.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/fixed-assets",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
