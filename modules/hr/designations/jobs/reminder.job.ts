export const designationsReminderJob = {
  name: "hr/designations.reminder",
  queue: "hr-designations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
