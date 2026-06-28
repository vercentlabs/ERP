export const campaignsReminderJob = {
  name: "crm/campaigns.reminder",
  queue: "crm-campaigns",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
