export const localizationRecomputeJob = {
  name: "platform/localization.recompute",
  queue: "platform-localization",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
