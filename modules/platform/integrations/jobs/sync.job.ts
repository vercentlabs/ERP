export const integrationsSyncJob = {
  name: "platform/integrations.sync",
  queue: "platform-integrations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
