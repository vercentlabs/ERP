export const reservationsRecomputeJob = {
  name: "inventory/reservations.recompute",
  queue: "inventory-reservations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
