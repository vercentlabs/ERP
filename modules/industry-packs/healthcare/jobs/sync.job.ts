export const healthcareSyncJob = {
  name: "industry-packs/healthcare.sync",
  queue: "industry-packs-healthcare",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
