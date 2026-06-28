export const nonConformanceReminderJob = {
  name: "quality/non-conformance.reminder",
  queue: "quality-non-conformance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
