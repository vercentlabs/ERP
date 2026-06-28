export const entitlementsSyncJob = {
  name: "helpdesk/entitlements.sync",
  queue: "helpdesk-entitlements",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
