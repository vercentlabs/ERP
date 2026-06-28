export const leadsSyncJob = {
  name: "crm/leads.sync",
  queue: "crm-leads",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
