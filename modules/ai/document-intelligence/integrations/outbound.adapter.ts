export const documentIntelligenceOutboundAdapter = {
  name: "ai/document-intelligence.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/document-intelligence",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
