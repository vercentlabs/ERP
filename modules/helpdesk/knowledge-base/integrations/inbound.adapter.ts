export const knowledgeBaseInboundAdapter = {
  name: "helpdesk/knowledge-base.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/knowledge-base",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
