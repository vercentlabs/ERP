export const knowledgeBaseWebhookAdapter = {
  name: "helpdesk/knowledge-base.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/knowledge-base",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
