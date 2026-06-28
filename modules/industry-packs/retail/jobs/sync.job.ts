export const retailSyncJob = {
  name: "industry-packs/retail.sync",
  queue: "industry-packs-retail",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
