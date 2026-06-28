export const cdcInboundAdapter = {
  name: "data-platform/cdc.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/cdc",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
