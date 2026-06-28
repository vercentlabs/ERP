export const educationRecomputeJob = {
  name: "industry-packs/education.recompute",
  queue: "industry-packs-education",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
