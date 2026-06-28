export const benefitsSyncJob = {
  name: "payroll/benefits.sync",
  queue: "payroll-benefits",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
