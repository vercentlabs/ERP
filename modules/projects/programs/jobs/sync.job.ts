export const programsSyncJob = {
  name: "projects/programs.sync",
  queue: "projects-programs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
