export const mitigationsSyncJob = {
  name: "risk-management/mitigations.sync",
  queue: "risk-management-mitigations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
