export const customerGroupsSyncJob = {
  name: "commerce/customer-groups.sync",
  queue: "commerce-customer-groups",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
