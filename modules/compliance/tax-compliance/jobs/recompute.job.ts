export const taxComplianceRecomputeJob = {
  name: "compliance/tax-compliance.recompute",
  queue: "compliance-tax-compliance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
