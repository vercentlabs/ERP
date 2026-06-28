export const slasReminderJob = {
  name: "helpdesk/slas.reminder",
  queue: "helpdesk-slas",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
