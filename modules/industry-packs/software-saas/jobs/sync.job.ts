export const softwareSaasSyncJob = {
  name: "industry-packs/software-saas.sync",
  queue: "industry-packs-software-saas",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
