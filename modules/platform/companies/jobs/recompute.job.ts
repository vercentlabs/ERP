export const companiesRecomputeJob = {
  name: "platform/companies.recompute",
  queue: "platform-companies",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
