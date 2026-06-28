export const branchesRecomputeJob = {
  name: "platform/branches.recompute",
  queue: "platform-branches",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
