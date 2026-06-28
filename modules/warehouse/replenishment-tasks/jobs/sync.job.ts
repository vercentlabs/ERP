export const replenishmentTasksSyncJob = {
  name: "warehouse/replenishment-tasks.sync",
  queue: "warehouse-replenishment-tasks",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
