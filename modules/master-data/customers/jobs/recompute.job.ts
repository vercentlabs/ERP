export const customersRecomputeJob = {
  name: "master-data/customers.recompute",
  queue: "master-data-customers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
