export const segregationOfDutiesSyncJob = {
  name: "compliance/segregation-of-duties.sync",
  queue: "compliance-segregation-of-duties",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
