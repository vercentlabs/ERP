export const nonConformanceRecomputeJob = {
  name: "quality/non-conformance.recompute",
  queue: "quality-non-conformance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
