export const equipmentSyncJob = {
  name: "maintenance/equipment.sync",
  queue: "maintenance-equipment",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
