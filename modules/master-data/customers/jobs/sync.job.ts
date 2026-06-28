export const customersSyncJob = {
  name: "master-data/customers.sync",
  queue: "master-data-customers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
