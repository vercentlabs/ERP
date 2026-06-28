export const customerPortalSyncJob = {
  name: "helpdesk/customer-portal.sync",
  queue: "helpdesk-customer-portal",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
