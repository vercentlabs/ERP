export const customObjectsSyncJob = {
  name: "extension-studio/custom-objects.sync",
  queue: "extension-studio-custom-objects",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
