export const queuesRecomputeJob = {
  name: "helpdesk/queues.recompute",
  queue: "helpdesk-queues",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
