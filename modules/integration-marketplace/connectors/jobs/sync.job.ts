export const connectorsSyncJob = {
  name: "integration-marketplace/connectors.sync",
  queue: "integration-marketplace-connectors",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
