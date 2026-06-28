export const varianceAnalysisReminderJob = {
  name: "enterprise-performance/variance-analysis.reminder",
  queue: "enterprise-performance-variance-analysis",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
