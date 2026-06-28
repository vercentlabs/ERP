export const supplierScorecardsSyncJob = {
  name: "procurement/supplier-scorecards.sync",
  queue: "procurement-supplier-scorecards",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
