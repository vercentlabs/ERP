export const sustainabilityReportsRecomputeJob = {
  name: "sustainability/sustainability-reports.recompute",
  queue: "sustainability-sustainability-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
