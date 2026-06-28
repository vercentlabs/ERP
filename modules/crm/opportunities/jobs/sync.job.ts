export const opportunitiesSyncJob = {
  name: "crm/opportunities.sync",
  queue: "crm-opportunities",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
