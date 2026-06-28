export const mobileScanningRecomputeJob = {
  name: "warehouse/mobile-scanning.recompute",
  queue: "warehouse-mobile-scanning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
