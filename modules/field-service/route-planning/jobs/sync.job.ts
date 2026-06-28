export const routePlanningSyncJob = {
  name: "field-service/route-planning.sync",
  queue: "field-service-route-planning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
