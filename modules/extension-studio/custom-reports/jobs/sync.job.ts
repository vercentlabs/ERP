export const customReportsSyncJob = {
  name: "extension-studio/custom-reports.sync",
  queue: "extension-studio-custom-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
