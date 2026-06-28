export const projectBillingReminderJob = {
  name: "projects/project-billing.reminder",
  queue: "projects-project-billing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
