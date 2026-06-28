export const benefitsRecomputeJob = {
  name: "payroll/benefits.recompute",
  queue: "payroll-benefits",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
