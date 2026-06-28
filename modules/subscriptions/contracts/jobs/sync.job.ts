export const contractsSyncJob = {
  name: "subscriptions/contracts.sync",
  queue: "subscriptions-contracts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
