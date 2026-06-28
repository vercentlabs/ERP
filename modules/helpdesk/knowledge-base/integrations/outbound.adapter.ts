export const knowledgeBaseOutboundAdapter = {
  name: "helpdesk/knowledge-base.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/knowledge-base",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
