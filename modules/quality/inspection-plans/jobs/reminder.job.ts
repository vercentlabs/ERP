export const inspectionPlansReminderJob = {
  name: "quality/inspection-plans.reminder",
  queue: "quality-inspection-plans",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
