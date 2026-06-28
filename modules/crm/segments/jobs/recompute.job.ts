export const segmentsRecomputeJob = {
  name: "crm/segments.recompute",
  queue: "crm-segments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
