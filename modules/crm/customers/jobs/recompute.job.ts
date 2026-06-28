export const customersRecomputeJob = {
  name: "crm/customers.recompute",
  queue: "crm-customers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
