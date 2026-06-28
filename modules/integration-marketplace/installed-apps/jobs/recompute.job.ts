export const installedAppsRecomputeJob = {
  name: "integration-marketplace/installed-apps.recompute",
  queue: "integration-marketplace-installed-apps",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
