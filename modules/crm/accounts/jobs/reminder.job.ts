export const accountsReminderJob = {
  name: "crm/accounts.reminder",
  queue: "crm-accounts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
