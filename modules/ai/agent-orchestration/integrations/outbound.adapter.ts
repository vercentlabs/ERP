export const agentOrchestrationOutboundAdapter = {
  name: "ai/agent-orchestration.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/agent-orchestration",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
