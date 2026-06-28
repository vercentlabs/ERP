export const riskAssessmentsSyncJob = {
  name: "risk-management/risk-assessments.sync",
  queue: "risk-management-risk-assessments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
