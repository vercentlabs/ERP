export const accountingPostingRecomputeJob = {
  name: "payroll/accounting-posting.recompute",
  queue: "payroll-accounting-posting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
