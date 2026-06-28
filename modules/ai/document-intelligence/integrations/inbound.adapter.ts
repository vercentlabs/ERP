export const documentIntelligenceInboundAdapter = {
  name: "ai/document-intelligence.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/document-intelligence",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
