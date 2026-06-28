export const workflowApprovalsWebhookAdapter = {
  name: "platform/workflow-approvals.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/workflow-approvals",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
