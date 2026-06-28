export const employmentContractsRecomputeJob = {
  name: "hr/employment-contracts.recompute",
  queue: "hr-employment-contracts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
