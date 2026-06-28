export const programsRecomputeJob = {
  name: "projects/programs.recompute",
  queue: "projects-programs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
