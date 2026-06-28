export const settingsRecomputeJob = {
  name: "platform/settings.recompute",
  queue: "platform-settings",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
