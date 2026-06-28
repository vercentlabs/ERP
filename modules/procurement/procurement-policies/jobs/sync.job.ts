export const procurementPoliciesSyncJob = {
  name: "procurement/procurement-policies.sync",
  queue: "procurement-procurement-policies",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
