export const dunningSyncJob = {
  name: "subscriptions/dunning.sync",
  queue: "subscriptions-dunning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
