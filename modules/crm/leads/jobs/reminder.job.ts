export const leadsReminderJob = {
  name: "crm/leads.reminder",
  queue: "crm-leads",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
