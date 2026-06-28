export const employmentContractsSyncJob = {
  name: "hr/employment-contracts.sync",
  queue: "hr-employment-contracts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
