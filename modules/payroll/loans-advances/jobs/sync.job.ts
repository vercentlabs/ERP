export const loansAdvancesSyncJob = {
  name: "payroll/loans-advances.sync",
  queue: "payroll-loans-advances",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
