export const agentOrchestrationWebhookAdapter = {
  name: "ai/agent-orchestration.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/agent-orchestration",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
