export const purchaseRequisitionsReminderJob = {
  name: "procurement/purchase-requisitions.reminder",
  queue: "procurement-purchase-requisitions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
