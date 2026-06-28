export const unitsOfMeasureRecomputeJob = {
  name: "inventory/units-of-measure.recompute",
  queue: "inventory-units-of-measure",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
