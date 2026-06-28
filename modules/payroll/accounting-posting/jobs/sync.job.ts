export const accountingPostingSyncJob = {
  name: "payroll/accounting-posting.sync",
  queue: "payroll-accounting-posting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
