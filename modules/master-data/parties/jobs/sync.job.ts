export const partiesSyncJob = {
  name: "master-data/parties.sync",
  queue: "master-data-parties",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
