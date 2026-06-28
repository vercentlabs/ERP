export const policyManagementRecomputeJob = {
  name: "risk-management/policy-management.recompute",
  queue: "risk-management-policy-management",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
