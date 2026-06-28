export const commissionsSyncJob = {
  name: "sales/commissions.sync",
  queue: "sales-commissions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
