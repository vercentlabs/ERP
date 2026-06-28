export const managementReportingSyncJob = {
  name: "enterprise-performance/management-reporting.sync",
  queue: "enterprise-performance-management-reporting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
