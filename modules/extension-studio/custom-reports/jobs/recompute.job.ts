export const customReportsRecomputeJob = {
  name: "extension-studio/custom-reports.recompute",
  queue: "extension-studio-custom-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
