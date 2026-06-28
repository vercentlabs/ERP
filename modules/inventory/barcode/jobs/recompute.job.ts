export const barcodeRecomputeJob = {
  name: "inventory/barcode.recompute",
  queue: "inventory-barcode",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
