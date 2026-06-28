export const operationalDataStoreSyncJob = {
  name: "data-platform/operational-data-store.sync",
  queue: "data-platform-operational-data-store",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
