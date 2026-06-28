export const taxComplianceSyncJob = {
  name: "compliance/tax-compliance.sync",
  queue: "compliance-tax-compliance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
