export const queuesReminderJob = {
  name: "helpdesk/queues.reminder",
  queue: "helpdesk-queues",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
