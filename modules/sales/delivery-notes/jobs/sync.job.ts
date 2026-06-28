export const deliveryNotesSyncJob = {
  name: "sales/delivery-notes.sync",
  queue: "sales-delivery-notes",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
