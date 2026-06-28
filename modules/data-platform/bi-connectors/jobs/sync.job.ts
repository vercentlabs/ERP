export const biConnectorsSyncJob = {
  name: "data-platform/bi-connectors.sync",
  queue: "data-platform-bi-connectors",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
