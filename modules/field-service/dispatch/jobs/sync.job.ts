export const dispatchSyncJob = {
  name: "field-service/dispatch.sync",
  queue: "field-service-dispatch",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
