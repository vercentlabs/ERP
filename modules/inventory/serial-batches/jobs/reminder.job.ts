export const serialBatchesReminderJob = {
  name: "inventory/serial-batches.reminder",
  queue: "inventory-serial-batches",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
