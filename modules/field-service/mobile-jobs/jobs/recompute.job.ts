export const mobileJobsRecomputeJob = {
  name: "field-service/mobile-jobs.recompute",
  queue: "field-service-mobile-jobs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
