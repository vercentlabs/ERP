export const productRevisionsReminderJob = {
  name: "product-lifecycle/product-revisions.reminder",
  queue: "product-lifecycle-product-revisions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
