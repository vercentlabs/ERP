export const projectCostingSyncJob = {
  name: "projects/project-costing.sync",
  queue: "projects-project-costing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
