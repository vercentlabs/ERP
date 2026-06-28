export const qualityInspectionsRecomputeJob = {
  name: "quality/quality-inspections.recompute",
  queue: "quality-quality-inspections",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
