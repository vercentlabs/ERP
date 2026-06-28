export const incidentsReminderJob = {
  name: "risk-management/incidents.reminder",
  queue: "risk-management-incidents",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
