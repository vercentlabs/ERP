export const procurementPoliciesRecomputeJob = {
  name: "procurement/procurement-policies.recompute",
  queue: "procurement-procurement-policies",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
