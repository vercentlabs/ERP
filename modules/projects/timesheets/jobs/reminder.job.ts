export const timesheetsReminderJob = {
  name: "projects/timesheets.reminder",
  queue: "projects-timesheets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
