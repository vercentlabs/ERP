export const reservationsSyncJob = {
  name: "inventory/reservations.sync",
  queue: "inventory-reservations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
