export const ticketsRecomputeJob = {
  name: "helpdesk/tickets.recompute",
  queue: "helpdesk-tickets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
