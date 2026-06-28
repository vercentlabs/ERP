export const sustainabilityReportsSyncJob = {
  name: "sustainability/sustainability-reports.sync",
  queue: "sustainability-sustainability-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
