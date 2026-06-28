export const managementReportingReminderJob = {
  name: "enterprise-performance/management-reporting.reminder",
  queue: "enterprise-performance-management-reporting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
