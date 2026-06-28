export const landedCostsSyncJob = {
  name: "procurement/landed-costs.sync",
  queue: "procurement-landed-costs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
