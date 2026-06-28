export const routingsSyncJob = {
  name: "manufacturing/routings.sync",
  queue: "manufacturing-routings",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
