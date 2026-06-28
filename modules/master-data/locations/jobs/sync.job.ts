export const locationsSyncJob = {
  name: "master-data/locations.sync",
  queue: "master-data-locations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
