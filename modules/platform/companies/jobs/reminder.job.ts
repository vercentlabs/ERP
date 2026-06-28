export const companiesReminderJob = {
  name: "platform/companies.reminder",
  queue: "platform-companies",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
