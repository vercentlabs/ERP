export const customer360SyncJob = {
  name: "crm/customer-360.sync",
  queue: "crm-customer-360",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
