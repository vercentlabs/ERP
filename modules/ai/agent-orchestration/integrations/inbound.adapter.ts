export const agentOrchestrationInboundAdapter = {
  name: "ai/agent-orchestration.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/agent-orchestration",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
