export const chartOfAccountsSyncJob = {
  name: "finance/chart-of-accounts.sync",
  queue: "finance-chart-of-accounts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
