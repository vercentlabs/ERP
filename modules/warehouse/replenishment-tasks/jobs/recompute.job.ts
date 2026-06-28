export const replenishmentTasksRecomputeJob = {
  name: "warehouse/replenishment-tasks.recompute",
  queue: "warehouse-replenishment-tasks",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
