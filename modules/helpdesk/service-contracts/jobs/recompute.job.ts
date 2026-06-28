export const serviceContractsRecomputeJob = {
  name: "helpdesk/service-contracts.recompute",
  queue: "helpdesk-service-contracts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
