export const bankAccountsSyncJob = {
  name: "finance/bank-accounts.sync",
  queue: "finance-bank-accounts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
