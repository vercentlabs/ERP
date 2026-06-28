export const ticketsReminderJob = {
  name: "helpdesk/tickets.reminder",
  queue: "helpdesk-tickets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
