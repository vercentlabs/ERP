export const contactsReminderJob = {
  name: "crm/contacts.reminder",
  queue: "crm-contacts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
