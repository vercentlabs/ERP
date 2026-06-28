export const escalationsSyncJob = {
  name: "helpdesk/escalations.sync",
  queue: "helpdesk-escalations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
