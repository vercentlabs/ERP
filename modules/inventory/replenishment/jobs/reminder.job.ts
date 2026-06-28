export const replenishmentReminderJob = {
  name: "inventory/replenishment.reminder",
  queue: "inventory-replenishment",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
