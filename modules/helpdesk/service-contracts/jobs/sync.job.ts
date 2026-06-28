export const serviceContractsSyncJob = {
  name: "helpdesk/service-contracts.sync",
  queue: "helpdesk-service-contracts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
