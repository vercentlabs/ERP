export const downtimeSyncJob = {
  name: "maintenance/downtime.sync",
  queue: "maintenance-downtime",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
