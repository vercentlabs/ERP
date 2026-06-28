export const activitiesReminderJob = {
  name: "crm/activities.reminder",
  queue: "crm-activities",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
