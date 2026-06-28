export const automotiveSyncJob = {
  name: "industry-packs/automotive.sync",
  queue: "industry-packs-automotive",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
