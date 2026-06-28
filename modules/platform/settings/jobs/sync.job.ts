export const settingsSyncJob = {
  name: "platform/settings.sync",
  queue: "platform-settings",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
