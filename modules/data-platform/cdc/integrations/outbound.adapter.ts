export const cdcOutboundAdapter = {
  name: "data-platform/cdc.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/cdc",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
