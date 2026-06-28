export const customer360RecomputeJob = {
  name: "crm/customer-360.recompute",
  queue: "crm-customer-360",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
