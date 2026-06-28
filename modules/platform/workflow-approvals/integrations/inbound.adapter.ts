export const workflowApprovalsInboundAdapter = {
  name: "platform/workflow-approvals.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/workflow-approvals",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
