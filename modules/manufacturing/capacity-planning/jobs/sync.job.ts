export const capacityPlanningSyncJob = {
  name: "manufacturing/capacity-planning.sync",
  queue: "manufacturing-capacity-planning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
