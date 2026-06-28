export const fiscalCalendarsRecomputeJob = {
  name: "platform/fiscal-calendars.recompute",
  queue: "platform-fiscal-calendars",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
