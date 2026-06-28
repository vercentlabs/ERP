export const carbonAccountingSyncJob = {
  name: "sustainability/carbon-accounting.sync",
  queue: "sustainability-carbon-accounting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
