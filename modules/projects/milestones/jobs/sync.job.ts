export const milestonesSyncJob = {
  name: "projects/milestones.sync",
  queue: "projects-milestones",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
