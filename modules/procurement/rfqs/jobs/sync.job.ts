export const rfqsSyncJob = {
  name: "procurement/rfqs.sync",
  queue: "procurement-rfqs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
