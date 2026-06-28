export const mobileScanningSyncJob = {
  name: "warehouse/mobile-scanning.sync",
  queue: "warehouse-mobile-scanning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
