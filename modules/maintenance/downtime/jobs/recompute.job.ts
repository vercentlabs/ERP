export const downtimeRecomputeJob = {
  name: "maintenance/downtime.recompute",
  queue: "maintenance-downtime",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
