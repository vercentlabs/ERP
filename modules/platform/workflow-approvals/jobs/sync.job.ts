export const workflowApprovalsSyncJob = {
  name: "platform/workflow-approvals.sync",
  queue: "platform-workflow-approvals",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
