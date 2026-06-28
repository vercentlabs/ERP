export const eventStreamsSyncJob = {
  name: "data-platform/event-streams.sync",
  queue: "data-platform-event-streams",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
