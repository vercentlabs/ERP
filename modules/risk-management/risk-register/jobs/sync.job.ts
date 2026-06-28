export const riskRegisterSyncJob = {
  name: "risk-management/risk-register.sync",
  queue: "risk-management-risk-register",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
