export const consentManagementSyncJob = {
  name: "compliance/consent-management.sync",
  queue: "compliance-consent-management",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
