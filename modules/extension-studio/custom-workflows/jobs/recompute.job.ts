export const customWorkflowsRecomputeJob = {
  name: "extension-studio/custom-workflows.recompute",
  queue: "extension-studio-custom-workflows",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
