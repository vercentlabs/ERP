export const qualityInspectionsReminderJob = {
  name: "quality/quality-inspections.reminder",
  queue: "quality-quality-inspections",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
