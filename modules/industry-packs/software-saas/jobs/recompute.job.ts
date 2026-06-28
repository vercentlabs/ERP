export const softwareSaasRecomputeJob = {
  name: "industry-packs/software-saas.recompute",
  queue: "industry-packs-software-saas",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
