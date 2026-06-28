export const campaignsSyncJob = {
  name: "crm/campaigns.sync",
  queue: "crm-campaigns",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
