export const localizationSyncJob = {
  name: "platform/localization.sync",
  queue: "platform-localization",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
