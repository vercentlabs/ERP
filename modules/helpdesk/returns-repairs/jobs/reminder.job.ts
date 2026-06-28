export const returnsRepairsReminderJob = {
  name: "helpdesk/returns-repairs.reminder",
  queue: "helpdesk-returns-repairs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
