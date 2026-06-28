export const professionalServicesSyncJob = {
  name: "industry-packs/professional-services.sync",
  queue: "industry-packs-professional-services",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
