export const financialReportsSyncJob = {
  name: "finance/financial-reports.sync",
  queue: "finance-financial-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
