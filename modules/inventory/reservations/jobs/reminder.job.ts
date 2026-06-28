export const reservationsReminderJob = {
  name: "inventory/reservations.reminder",
  queue: "inventory-reservations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
