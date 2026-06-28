export const dataQualitySyncJob = {
  name: "master-data/data-quality.sync",
  queue: "master-data-data-quality",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
