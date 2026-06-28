export const billOfMaterialsReminderJob = {
  name: "manufacturing/bill-of-materials.reminder",
  queue: "manufacturing-bill-of-materials",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
