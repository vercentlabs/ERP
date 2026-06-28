export const fiscalCalendarsSyncJob = {
  name: "platform/fiscal-calendars.sync",
  queue: "platform-fiscal-calendars",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
