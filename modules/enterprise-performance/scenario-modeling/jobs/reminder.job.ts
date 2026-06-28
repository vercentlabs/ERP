export const scenarioModelingReminderJob = {
  name: "enterprise-performance/scenario-modeling.reminder",
  queue: "enterprise-performance-scenario-modeling",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
