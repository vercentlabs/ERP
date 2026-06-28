export const shiftsReminderJob = {
  name: "hr/shifts.reminder",
  queue: "hr-shifts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
