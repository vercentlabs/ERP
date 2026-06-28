export const workflowApprovalsOutboundAdapter = {
  name: "platform/workflow-approvals.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/workflow-approvals",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
