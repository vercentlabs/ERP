export const riskAssessmentsRecomputeJob = {
  name: "risk-management/risk-assessments.recompute",
  queue: "risk-management-risk-assessments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
