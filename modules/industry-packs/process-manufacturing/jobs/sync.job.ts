export const processManufacturingSyncJob = {
  name: "industry-packs/process-manufacturing.sync",
  queue: "industry-packs-process-manufacturing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
