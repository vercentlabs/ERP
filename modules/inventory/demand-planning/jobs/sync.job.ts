export const demandPlanningSyncJob = {
  name: "inventory/demand-planning.sync",
  queue: "inventory-demand-planning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
