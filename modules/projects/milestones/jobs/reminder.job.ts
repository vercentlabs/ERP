export const milestonesReminderJob = {
  name: "projects/milestones.reminder",
  queue: "projects-milestones",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
