export const loansAdvancesRecomputeJob = {
  name: "payroll/loans-advances.recompute",
  queue: "payroll-loans-advances",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
