export const dataRetentionOutboundAdapter = {
  name: "compliance/data-retention.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/data-retention",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
