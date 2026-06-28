export const opportunitiesReminderJob = {
  name: "crm/opportunities.reminder",
  queue: "crm-opportunities",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
