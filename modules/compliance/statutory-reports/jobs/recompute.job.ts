export const statutoryReportsRecomputeJob = {
  name: "compliance/statutory-reports.recompute",
  queue: "compliance-statutory-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
