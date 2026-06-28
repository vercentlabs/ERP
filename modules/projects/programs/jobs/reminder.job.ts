export const programsReminderJob = {
  name: "projects/programs.reminder",
  queue: "projects-programs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
