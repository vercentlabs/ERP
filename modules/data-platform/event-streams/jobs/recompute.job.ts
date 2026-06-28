export const eventStreamsRecomputeJob = {
  name: "data-platform/event-streams.recompute",
  queue: "data-platform-event-streams",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
