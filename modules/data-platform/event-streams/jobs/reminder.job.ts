export const eventStreamsReminderJob = {
  name: "data-platform/event-streams.reminder",
  queue: "data-platform-event-streams",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
