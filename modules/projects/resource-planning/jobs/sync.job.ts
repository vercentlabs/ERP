export const resourcePlanningSyncJob = {
  name: "projects/resource-planning.sync",
  queue: "projects-resource-planning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
