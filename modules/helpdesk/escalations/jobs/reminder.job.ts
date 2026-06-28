export const escalationsReminderJob = {
  name: "helpdesk/escalations.reminder",
  queue: "helpdesk-escalations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
