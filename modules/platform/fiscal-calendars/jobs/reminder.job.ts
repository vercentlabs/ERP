export const fiscalCalendarsReminderJob = {
  name: "platform/fiscal-calendars.reminder",
  queue: "platform-fiscal-calendars",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
