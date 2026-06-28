export const policyManagementSyncJob = {
  name: "risk-management/policy-management.sync",
  queue: "risk-management-policy-management",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
