export const managementReportingRecomputeJob = {
  name: "enterprise-performance/management-reporting.recompute",
  queue: "enterprise-performance-management-reporting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
