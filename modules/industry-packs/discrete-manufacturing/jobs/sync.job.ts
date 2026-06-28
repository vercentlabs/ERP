export const discreteManufacturingSyncJob = {
  name: "industry-packs/discrete-manufacturing.sync",
  queue: "industry-packs-discrete-manufacturing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
