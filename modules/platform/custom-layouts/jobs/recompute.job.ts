export const customLayoutsRecomputeJob = {
  name: "platform/custom-layouts.recompute",
  queue: "platform-custom-layouts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
