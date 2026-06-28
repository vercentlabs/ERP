export const customLayoutsSyncJob = {
  name: "platform/custom-layouts.sync",
  queue: "platform-custom-layouts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
