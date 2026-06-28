export const accountingPeriodsSyncJob = {
  name: "finance/accounting-periods.sync",
  queue: "finance-accounting-periods",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
