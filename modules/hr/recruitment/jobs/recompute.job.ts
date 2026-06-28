export const recruitmentRecomputeJob = {
  name: "hr/recruitment.recompute",
  queue: "hr-recruitment",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
