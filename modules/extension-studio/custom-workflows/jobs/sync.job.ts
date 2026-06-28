export const customWorkflowsSyncJob = {
  name: "extension-studio/custom-workflows.sync",
  queue: "extension-studio-custom-workflows",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
