export const projectBillingSyncJob = {
  name: "projects/project-billing.sync",
  queue: "projects-project-billing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
