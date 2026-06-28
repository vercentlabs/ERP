export const barcodeReminderJob = {
  name: "inventory/barcode.reminder",
  queue: "inventory-barcode",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
