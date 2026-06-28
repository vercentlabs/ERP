export const leadScoringSyncJob = {
  name: "crm/lead-scoring.sync",
  queue: "crm-lead-scoring",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
