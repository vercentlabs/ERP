export const customersSyncJob = {
  name: "crm/customers.sync",
  queue: "crm-customers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
