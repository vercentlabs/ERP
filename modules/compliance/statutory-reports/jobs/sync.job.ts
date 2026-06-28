export const statutoryReportsSyncJob = {
  name: "compliance/statutory-reports.sync",
  queue: "compliance-statutory-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
