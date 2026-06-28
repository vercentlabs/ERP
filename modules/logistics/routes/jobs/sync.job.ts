export const routesSyncJob = {
  name: "logistics/routes.sync",
  queue: "logistics-routes",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
