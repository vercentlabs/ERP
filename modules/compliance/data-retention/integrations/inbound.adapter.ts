export const dataRetentionInboundAdapter = {
  name: "compliance/data-retention.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/data-retention",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
