export const queuesSyncJob = {
  name: "helpdesk/queues.sync",
  queue: "helpdesk-queues",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
