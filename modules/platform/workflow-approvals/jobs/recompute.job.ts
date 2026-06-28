export const workflowApprovalsRecomputeJob = {
  name: "platform/workflow-approvals.recompute",
  queue: "platform-workflow-approvals",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
