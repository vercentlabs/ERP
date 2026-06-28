export const customDashboardsSyncJob = {
  name: "extension-studio/custom-dashboards.sync",
  queue: "extension-studio-custom-dashboards",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
