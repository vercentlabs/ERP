export const barcodeSyncJob = {
  name: "inventory/barcode.sync",
  queue: "inventory-barcode",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
