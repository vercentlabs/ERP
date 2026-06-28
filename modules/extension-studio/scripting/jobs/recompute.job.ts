export const scriptingRecomputeJob = {
  name: "extension-studio/scripting.recompute",
  queue: "extension-studio-scripting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
