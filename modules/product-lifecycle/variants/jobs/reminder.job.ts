export const variantsReminderJob = {
  name: "product-lifecycle/variants.reminder",
  queue: "product-lifecycle-variants",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
