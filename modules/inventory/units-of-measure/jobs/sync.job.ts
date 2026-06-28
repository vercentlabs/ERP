export const unitsOfMeasureSyncJob = {
  name: "inventory/units-of-measure.sync",
  queue: "inventory-units-of-measure",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
