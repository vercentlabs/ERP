export const customFieldsSyncJob = {
  name: "platform/custom-fields.sync",
  queue: "platform-custom-fields",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
