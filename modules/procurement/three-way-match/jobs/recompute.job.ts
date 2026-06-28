export const threeWayMatchRecomputeJob = {
  name: "procurement/three-way-match.recompute",
  queue: "procurement-three-way-match",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
