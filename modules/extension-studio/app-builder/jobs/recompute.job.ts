export const appBuilderRecomputeJob = {
  name: "extension-studio/app-builder.recompute",
  queue: "extension-studio-app-builder",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
