export const riskRegisterRecomputeJob = {
  name: "risk-management/risk-register.recompute",
  queue: "risk-management-risk-register",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
