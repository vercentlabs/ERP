export const slasSyncJob = {
  name: "helpdesk/slas.sync",
  queue: "helpdesk-slas",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
