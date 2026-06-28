export const dataGovernanceSyncJob = {
  name: "master-data/data-governance.sync",
  queue: "master-data-data-governance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
