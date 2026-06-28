export const fiscalYearsSyncJob = {
  name: "finance/fiscal-years.sync",
  queue: "finance-fiscal-years",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
