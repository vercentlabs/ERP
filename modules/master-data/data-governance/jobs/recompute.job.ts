export const dataGovernanceRecomputeJob = {
  name: "master-data/data-governance.recompute",
  queue: "master-data-data-governance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
