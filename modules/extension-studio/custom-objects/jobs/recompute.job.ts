export const customObjectsRecomputeJob = {
  name: "extension-studio/custom-objects.recompute",
  queue: "extension-studio-custom-objects",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
