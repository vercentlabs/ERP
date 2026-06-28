export const installedAppsSyncJob = {
  name: "integration-marketplace/installed-apps.sync",
  queue: "integration-marketplace-installed-apps",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
