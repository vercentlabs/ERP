export const equipmentRecomputeJob = {
  name: "maintenance/equipment.recompute",
  queue: "maintenance-equipment",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
