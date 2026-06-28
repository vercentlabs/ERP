export const projectBillingRecomputeJob = {
  name: "projects/project-billing.recompute",
  queue: "projects-project-billing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
