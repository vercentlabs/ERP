export const ticketsSyncJob = {
  name: "helpdesk/tickets.sync",
  queue: "helpdesk-tickets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
