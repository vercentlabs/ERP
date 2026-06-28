export const lifecycleCostingReminderJob = {
  name: "product-lifecycle/lifecycle-costing.reminder",
  queue: "product-lifecycle-lifecycle-costing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
