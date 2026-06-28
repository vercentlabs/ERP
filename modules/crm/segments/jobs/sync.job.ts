export const segmentsSyncJob = {
  name: "crm/segments.sync",
  queue: "crm-segments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
