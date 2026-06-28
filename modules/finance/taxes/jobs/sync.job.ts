export const taxesSyncJob = {
  name: "finance/taxes.sync",
  queue: "finance-taxes",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
