export const customPagesRecomputeJob = {
  name: "extension-studio/custom-pages.recompute",
  queue: "extension-studio-custom-pages",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
